import Button from "@/components/Button";
import InfoBox from "@/components/InfoBox";
import GPToken from "@/components/icons/GPToken";
import Header from "@/components/typography/Header";
import Text from "@/components/typography/Text";
import CharacterSheet from "@/lib/CharacterSheet";
import {
  Box,
  Container,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { AuthContext } from "../providers/AuthProvider";
import { DataContext } from "../providers/DataProvider";
import { AbilityScoreTable, SkillsTable } from "./[characterId]/Tables";
import {
  generateCharacterImage,
  getCharacterImage,
  saveCharacterSheet,
  updateCharacterSheet,
} from "./lib";
import { useReactToPrint } from "react-to-print";
import { CharacterSheetPrint } from "./CharacterSheetPrint";

function hideNonRenderable(val: unknown) {
  if (typeof val !== "number" && typeof val !== "string") {
    return "";
  }
  return val;
}

function hideNonRenderableArr(val: unknown) {
  if (Array.isArray(val)) {
    return val;
  }
  return [];
}

export default function CharacterSheetTemplate({
  isPreview,
  charSheet,
  getCharSheet,
  id,
}: {
  charSheet: CharacterSheet;
  getCharSheet: () => Promise<void>;
  isPreview?: boolean;
  /** Used for existing char sheet view */
  id?: string;
}) {
  const authContext = useContext(AuthContext);
  const data = useContext(DataContext);

  // For preview - save button
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState(false);

  const hasGp =
    data.state.user.goldBalance != null && data.state.user.goldBalance > 0;

  // Image gen
  const [imgUrl, setImgUrl] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const {
    isOpen: imgGenModalOpen,
    onOpen: onOpenImgGenModal,
    onClose: onCloseImgGenModal,
  } = useDisclosure();

  // Fetch image
  useEffect(() => {
    async function run() {
      if (charSheet.charImage && authContext.idToken) {
        try {
          setLoadingImage(true);
          const { url } = await getCharacterImage(
            charSheet.charImage,
            authContext.idToken
          );
          setImgUrl(url);
        } catch {
          setImgErr(true);
        } finally {
          setLoadingImage(false);
        }
      }
    }
    void run();
  }, [authContext.idToken, charSheet.charImage]);

  const canGenerateImage = hasGp && !isPreview && !imgUrl && !loadingImage;

  const generateImageAndSave = useCallback(async () => {
    if (!authContext.idToken || !charSheet || !id) return;
    setLoadingImage(true);
    try {
      const { url } = await generateCharacterImage(
        charSheet,
        authContext.idToken
      );
      if (typeof url !== "string") throw "Error";
      await updateCharacterSheet(
        id,
        { ...charSheet, charImage: url },
        authContext.idToken
      );

      // Refresh charSheet
      void getCharSheet();
    } catch {
      setImgErr(true);
    } finally {
      setLoadingImage(false);
    }
  }, [authContext.idToken, charSheet, getCharSheet, id]);

  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current as any,
  });

  return (
    <Container maxWidth="container.lg" as="main" py={4}>
      {isPreview && !saved && (
        <InfoBox justifyContent="center" mb={8}>
          <em style={{ fontSize: 16 }}>
            Do not navigate away from this page without clicking save, or your
            character will be lost!
          </em>
        </InfoBox>
      )}
      <Flex gap={4}>
        {/* Name, bio, share, print */}
        <Box>
          <Flex>
            <Box>
              <Header as="h1" glow>
                {hideNonRenderable(charSheet.name)}
              </Header>
              <Text fontSize={16} fontWeight={500}>
                Level {hideNonRenderable(charSheet.level)}{" "}
                {hideNonRenderable(charSheet.class)}{" "}
                {hideNonRenderable(charSheet.race)}
              </Text>
              <Text mb={4} fontSize={16} fontWeight={500}>
                <em>{hideNonRenderable(charSheet.background.description)}</em>
              </Text>
              <Text fontSize={14}>
                {hideNonRenderable(charSheet.backstory)}
              </Text>
            </Box>
            <Box flexShrink={0}>
              {/* <Button secondary w="100%" mb={2}>
                Share
              </Button> */}
              {isPreview && (
                <Button
                  disabled={!authContext.idToken || saved}
                  w="100%"
                  mb={2}
                  onClick={async () => {
                    if (!authContext.idToken || saved) return;
                    setSaving(true);
                    try {
                      await saveCharacterSheet(charSheet, authContext.idToken);
                      setSaveErr(false);
                      setSaved(true);
                    } catch {
                      setSaveErr(true);
                    } finally {
                      setSaving(false);
                      data.refresh();
                    }
                  }}
                >
                  {saved ? (
                    "Saved"
                  ) : saving ? (
                    <span>
                      <Spinner size="xs" /> Saving...
                    </span>
                  ) : saveErr ? (
                    "Error, click to try again"
                  ) : (
                    "Save"
                  )}
                </Button>
              )}
              <Button secondary w="100%" onClick={handlePrint}>
                Print
              </Button>
            </Box>
          </Flex>
        </Box>
        {/* Image card */}
        <Flex
          bg={imgUrl ? `url(${imgUrl})` : "#231F17"}
          backgroundSize="cover"
          h={500}
          w={400}
          flexShrink={0}
          borderRadius={20}
          border="solid 2px #999080"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          transform="rotate(1deg)"
          px={8}
          gap={2}
          filter="drop-shadow(0 0 0px #585342)"
          _hover={{
            ...(canGenerateImage && {
              filter: "drop-shadow(0 0 6px #585342)",
              cursor: "pointer",
            }),
          }}
          transition="all 0.2s"
          onClick={canGenerateImage ? onOpenImgGenModal : undefined}
        >
          {canGenerateImage && <BiPlusCircle color="#D7C5A0" size={32} />}
          <Text textAlign="center">
            {isPreview
              ? "Save this character sheet if you want to generate an image."
              : canGenerateImage
              ? "Generate an image!"
              : null}
          </Text>
          {!isPreview && !imgUrl && (
            <InfoBox w="80%" justifyContent="center" textAlign="center">
              {hasGp ? (
                <>
                  Image generation costs <GPToken height={14} width={14} /> 1GP.
                </>
              ) : (
                <>
                  You don{"'"}t have <GPToken height={14} width={14} /> GP to
                  generate an image.
                </>
              )}
            </InfoBox>
          )}
        </Flex>
      </Flex>
      {/* Image generation confirmation modal */}
      <Modal isOpen={imgGenModalOpen} onClose={onCloseImgGenModal}>
        <ModalOverlay />
        <ModalContent bg="#231F17" minW="500px" minH="200px">
          <ModalHeader>
            <Text fontFamily="var(--font-source-sans)" fontSize="inherit">
              Confirm Image Generation
            </Text>
          </ModalHeader>
          <ModalCloseButton color="brand.800" />
          <ModalBody minW="500px">
            <Text>
              Generating a new image of your character will use{" "}
              <GPToken height={14} width={14} /> 1GP.
            </Text>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button onClick={onCloseImgGenModal} secondary>
              Cancel
            </Button>
            <Button
              onClick={() => {
                void generateImageAndSave();
                onCloseImgGenModal();
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Big stats */}
      <Flex
        w="100%"
        justifyContent="space-evenly"
        borderRadius={30}
        bg="#1F1B13"
        border="2px solid #4D4639"
        alignItems="center"
        pt="2px"
        pb="12px"
        mt={8}
      >
        <Flex flexDir="column" alignItems="center" justifyContent="center">
          <Text mb={0} fontSize={48}>
            {hideNonRenderable(charSheet.armorClass)}
          </Text>
          <Text fontWeight={600}>Armor Class</Text>
        </Flex>
        <Flex flexDir="column" alignItems="center" justifyContent="center">
          <Text mb={0} fontSize={48}>
            {hideNonRenderable(charSheet.initiative)}
          </Text>
          <Text fontWeight={600}>Initiative</Text>
        </Flex>
        <Flex flexDir="column" alignItems="center" justifyContent="center">
          <Text mb={0} fontSize={48}>
            {hideNonRenderable(charSheet.speed)}
          </Text>
          <Text fontWeight={600}>Speed</Text>
        </Flex>
        <Flex flexDir="column" alignItems="center" justifyContent="center">
          <Text mb={0} fontSize={48}>
            {hideNonRenderable(charSheet.hitDice)}
          </Text>
          <Text fontWeight={600}>Hit Dice</Text>
        </Flex>
        <Flex flexDir="column" alignItems="center" justifyContent="center">
          <Text mb={0} fontSize={48}>
            {hideNonRenderable(charSheet.hitPointMax)}
          </Text>
          <Text fontWeight={600}>Hit Point Maximum</Text>
        </Flex>
      </Flex>
      {/* Ability Scores */}
      <Flex
        w="100%"
        justifyContent="space-evenly"
        borderRadius={10}
        bg="#1F1B13"
        border="2px solid #4D4639"
        alignItems="center"
        pt="2px"
        pb="12px"
        mt={4}
      >
        <AbilityScoreTable charSheet={charSheet} />
      </Flex>
      <Flex w="100%" pt="2px" pb="12px" mt={4} gap={4}>
        {/* Skills */}
        <Box
          flexShrink={0}
          borderRadius={10}
          bg="#1F1B13"
          border="2px solid #4D4639"
          alignItems="center"
          pt="2px"
          pb="12px"
          px="24px"
        >
          <Header as="h2" textAlign="center" fontSize={24}>
            Skills
          </Header>
          <SkillsTable charSheet={charSheet} />
        </Box>
        <Flex flexDir="column" gap={4}>
          {/* Features & Traits */}
          <Box
            w="100%"
            borderRadius={10}
            bg="#1F1B13"
            border="2px solid #4D4639"
            alignItems="center"
            pt="2px"
            pb="12px"
            px="24px"
          >
            <Header as="h2" textAlign="center" fontSize={24}>
              Features
            </Header>
            <Flex flexWrap="wrap">
              {hideNonRenderableArr(charSheet.features)?.map((feature) => {
                return (
                  <Text key={feature} mb={0} px={2} fontSize={14}>
                    {feature}
                  </Text>
                );
              })}
            </Flex>
            <Header as="h2" textAlign="center" fontSize={24}>
              Traits
            </Header>
            {hideNonRenderableArr(charSheet.personalityTraits)?.map((trait) => {
              return (
                <Text key={trait} fontSize={14}>
                  {trait}
                </Text>
              );
            })}
          </Box>
          {/* Proficiencies & Language */}
          <Box
            w="100%"
            borderRadius={10}
            bg="#1F1B13"
            border="2px solid #4D4639"
            alignItems="center"
            pt="2px"
            pb="12px"
            px="24px"
          >
            <Header as="h2" textAlign="center" fontSize={24}>
              Weapon Proficiency
            </Header>
            <Flex flexWrap="wrap">
              {hideNonRenderableArr(charSheet.weaponProficiency)?.map((wp) => {
                return (
                  <Text key={wp} mb={0} px={2} fontSize={14}>
                    {wp}
                  </Text>
                );
              })}
            </Flex>
            <Header as="h2" textAlign="center" fontSize={24} mt={2}>
              Armor Proficiency
            </Header>
            <Flex flexWrap="wrap">
              {hideNonRenderableArr(charSheet.armorProficiency)?.map((ap) => {
                return (
                  <Text key={ap} mb={0} px={2}>
                    {ap}
                  </Text>
                );
              })}
            </Flex>
            <Header as="h2" textAlign="center" fontSize={24} mt={2}>
              Tool Proficiency
            </Header>
            <Flex flexWrap="wrap">
              {hideNonRenderableArr(charSheet.toolProficiency)?.length ? (
                charSheet.toolProficiency.map((tp) => {
                  return (
                    <Text key={tp} mb={0} px={2}>
                      {tp}
                    </Text>
                  );
                })
              ) : (
                <Text mb={0} px={2}>
                  N/A
                </Text>
              )}
            </Flex>
          </Box>
        </Flex>
      </Flex>
      {/* Print contents - hidden */}
      <div style={{ position: "absolute", top: 0, left: 0, display: "none" }}>
        <CharacterSheetPrint
          charSheet={charSheet}
          ref={printRef}
        />
      </div>
    </Container>
  );
}

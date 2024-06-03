import "./table.css";

export function AbilityScoreTable({
  charSheet,
  print,
}: {
  charSheet: any;
  print?: boolean;
}) {
  return (
    <table
      style={{ width: "100%" }}
      className={print ? "print " + "ability-table" : "ability-table"}
    >
      <thead>
        <tr>
          <th />
          <th>Score</th>
          <th>Modifier</th>
          <th>Saving Throw</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Strength</th>
          <td>{charSheet.abilityScores.strength}</td>
          <td>{charSheet.abilityModifiers.strength}</td>
          <td>{charSheet.savingThrows.strength}</td>
        </tr>
        <tr>
          <th>Dexterity</th>
          <td>{charSheet.abilityScores.dexterity}</td>
          <td>{charSheet.abilityModifiers.dexterity}</td>
          <td>{charSheet.savingThrows.dexterity}</td>
        </tr>
        <tr>
          <th>Constitution</th>
          <td>{charSheet.abilityScores.constitution}</td>
          <td>{charSheet.abilityModifiers.constitution}</td>
          <td>{charSheet.savingThrows.constitution}</td>
        </tr>
        <tr>
          <th>Intelligence</th>
          <td>{charSheet.abilityScores.intelligence}</td>
          <td>{charSheet.abilityModifiers.intelligence}</td>
          <td>{charSheet.savingThrows.intelligence}</td>
        </tr>
        <tr>
          <th>Wisdom</th>
          <td>{charSheet.abilityScores.wisdom}</td>
          <td>{charSheet.abilityModifiers.wisdom}</td>
          <td>{charSheet.savingThrows.wisdom}</td>
        </tr>
        <tr>
          <th>Charisma</th>
          <td>{charSheet.abilityScores.charisma}</td>
          <td>{charSheet.abilityModifiers.charisma}</td>
          <td>{charSheet.savingThrows.charisma}</td>
        </tr>
      </tbody>
    </table>
  );
}

export function SkillsTable({
  charSheet,
  print,
}: {
  charSheet: any;
  print?: boolean;
}) {
  return (
    <table
      style={{ width: "100%" }}
      className={print ? "print " + "skills-table" : "skills-table"}
    >
      <tbody>
        <tr>
          <th>Acrobatics (Dex):</th>
          <td>{charSheet.skills["Athletics"]}</td>
        </tr>
        <tr>
          <th>Animal Handling (Wis):</th>
          <td>{charSheet.skills["Animal Handling"]}</td>
        </tr>
        <tr>
          <th>Arcana (Int):</th>
          <td>{charSheet.skills["Arcana"]}</td>
        </tr>
        <tr>
          <th>Athletics (Str):</th>
          <td>{charSheet.skills["Athletics"]}</td>
        </tr>
        <tr>
          <th>Deception (Cha):</th>
          <td>{charSheet.skills["Deception"]}</td>
        </tr>
        <tr>
          <th>History (Int):</th>
          <td>{charSheet.skills["History"]}</td>
        </tr>
        <tr>
          <th>Insight (Wis):</th>
          <td>{charSheet.skills["Insight"]}</td>
        </tr>
        <tr>
          <th>Intimidation (Cha):</th>
          <td>{charSheet.skills["Intimidation"]}</td>
        </tr>
        <tr>
          <th>Investigation (Int):</th>
          <td>{charSheet.skills["Investigation"]}</td>
        </tr>
        <tr>
          <th>Medicine (Wis):</th>
          <td>{charSheet.skills["Medicine"]}</td>
        </tr>
        <tr>
          <th>Nature (Int):</th>
          <td>{charSheet.skills["Nature"]}</td>
        </tr>
        <tr>
          <th>Perception (Wis):</th>
          <td>{charSheet.skills["Perception"]}</td>
        </tr>
        <tr>
          <th>Performance (Cha):</th>
          <td>{charSheet.skills["Performance"]}</td>
        </tr>
        <tr>
          <th>Persuasion (Cha):</th>
          <td>{charSheet.skills["Persuasion"]}</td>
        </tr>
        <tr>
          <th>Religion (Int):</th>
          <td>{charSheet.skills["Religion"]}</td>
        </tr>
        <tr>
          <th>Sleight of Hand (Dex):</th>
          <td>{charSheet.skills["Sleight of Hand"]}</td>
        </tr>
        <tr>
          <th>Stealth (Dex):</th>
          <td>{charSheet.skills["Stealth"]}</td>
        </tr>
        <tr>
          <th>Survival (Wis):</th>
          <td>{charSheet.skills["Survival"]}</td>
        </tr>
      </tbody>
    </table>
  );
}

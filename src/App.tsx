import { useEffect, useState } from "react";

const App = () => {
  const [names, setNames] = useState("");
  const [teams, setTeams] = useState<string[][]>([]);

  const [playersOnTeam, setPlayersOnTeam] = useState(6);

  const generateTeams = () => {
    const nameList = names.split("\n").filter((name) => name.trim() !== "");
    const shuffledNames = nameList.sort(() => 0.5 - Math.random());
    const teamChunks = [];

    while (shuffledNames.length > 0) {
      teamChunks.push(shuffledNames.splice(0, playersOnTeam));
    }

    setTeams(teamChunks);
  };

  useEffect(() => {
    if (!playersOnTeam) return;
    if (names.length === 0) return;
    generateTeams();
  }, [playersOnTeam]);

  return (
    <div className="min-h-screen bg-gray-100 p-5 flex flex-col items-center">
      <div className="flex items-center justify-center mb-5 ">
        <h1 className="text-2xl font-bold text-gray-700 ">
          Gerador de Times da Jerusa FC
        </h1>
        <img
          className="w-10 h-10"
          src="./assets/jerusa_logo2.png"
          alt="Logo da jerusa"
        />
      </div>
      <input
        className="w-full max-w-md h-10 mb-5 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        type="number"
        inputMode="numeric"
        onChange={(e) => setPlayersOnTeam(Number(e.target.value))}
        placeholder="Quantidade de jogadores por time"
      />
      <textarea
        className="w-full max-w-md h-40 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        placeholder="Insira os nomes aqui, um por linha"
        value={names}
        onChange={(e) => setNames(e.target.value)}
      />
      <button
        onClick={generateTeams}
        className="bg-blue-500 text-white px-5 py-2 rounded-md mt-3 hover:bg-blue-600"
      >
        Gerar Times
      </button>
      {teams.length > 0 && (
        <div className="mt-5 w-full max-w-md">
          {teams.map((team, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow-md rounded-md mb-3 border border-gray-200"
            >
              <h2 className="font-semibold text-gray-700 mb-2">
                Time {index + 1}
              </h2>
              <ul className="list-disc pl-5">
                {team.map((member, idx) => (
                  <li key={idx} className="text-gray-600">
                    {member}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

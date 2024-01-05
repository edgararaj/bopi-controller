"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useEffect } from "react";
import { useState } from "react";

export default function Page() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // fetch games from the server
    fetch("/api/games").then(async (response) => {
      const data = await response.json();
      setGames(data.games);
    });
  }, []);

  return (
    <div className="flex justify-center">
      <Table className="w-1/2">
        <TableHeader>
          <TableColumn>LINK</TableColumn>
        </TableHeader>
        <TableBody>
          {games && games.map((game, index) => (
            <TableRow key={index}>
              <TableCell><a href={game}>{game}</a></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

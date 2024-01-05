import { NextResponse } from "next/server";
import axios from "axios";

async function getLinksForEventID(IDEVENTA) {
  axios.get(`https://api.sofascore.app/api/v1/tv/event/${IDEVENTA}/country-channels`).then((resp) => {
    return resp.data;
  });
}

export async function GET() {
  const url = "https://api.sofascore.app/api/v1/sport/football/events/live";

  const data = (await axios.get(url)).data;

  const tournamentNames = [];
  const games = [];
  // parse body as a json array of events where each event has
  const todaysEvents = data.events;
  for (const event of todaysEvents) {
    const tournamentId = event.tournament.uniqueTournament
      ? event.tournament.uniqueTournament.id
      : event.tournament.id;

    if (!tournamentNames.includes(tournamentId)) {
      tournamentNames.push(tournamentId);

      const isPremium = event.tournament.uniqueTournament
        ? "unique-tournament"
        : "tournament";

      const tournamentName = event.tournament.name;
      const tournamentCountry = event.tournament.category.name;
      const flag = event.tournament.category.alpha2
        ? event.tournament.category.alpha2.toLowerCase()
        : "international";
      const eventStatus = event.status.type;

      console.log(
        `${tournamentName} (${tournamentCountry}) (${isPremium}) Event status: '${eventStatus}' (https://24sport.stream/match/${event.id}/${event.slug})`
      );
      games.push(`https://24sport.stream/match/${event.id}/${event.slug}`);

      // const data = await getLinksForEventID(event.id);
      // // data is of type {"countryChannels":{"MK":[3783],"BA":[3783],"RS":[3783]}}
      // // and want to generate a list of links like https://24sport.stream/player/BA/3783
      // const countryChannels = JSON.parse(data).countryChannels;
      // // certify countryChannels is not empty and merge with below code
      // if (countryChannels) {
      //   console.log("Links:");
      //   Object.keys(countryChannels).forEach(function (country) {
      //     countryChannels[country].forEach(function (channel) {
      //       console.log(`https://24game.stream/player/${country}/${channel}`);
      //     });
      //   });
      // }
      // console.log("");
    }
  }
  return NextResponse.json({ games });
}

import { prisma } from "../src/shared/db/prisma";
import { Color, MatchResult, TournamentType } from "../src/generated/prisma/client";

const leaders = [
  {
    code: "OP01-001",
    name: "Monkey D. Luffy",
    colors: [Color.RED],
    imageUrl: "/leaders/OP01-001.png",
  },
  {
    code: "OP01-002",
    name: "Roronoa Zoro",
    colors: [Color.GREEN],
    imageUrl: "/leaders/OP01-002.png",
  },
  {
    code: "OP01-003",
    name: "Trafalgar Law",
    colors: [Color.RED, Color.GREEN],
    imageUrl: "/leaders/OP01-003.png",
  },
  {
    code: "OP01-004",
    name: "Sir Crocodile",
    colors: [Color.BLUE, Color.BLACK],
    imageUrl: "/leaders/OP01-004.png",
  },
];

const DEMO_USER_ID = "00000000-0000-0000-0000-000000000001";
const DEMO_DECK_ID = "00000000-0000-0000-0000-000000000002";
const DEMO_TOURNAMENT_ID = "00000000-0000-0000-0000-000000000003";
const DEMO_MATCH_ID = "00000000-0000-0000-0000-000000000004";

async function main() {
  // 1) Leaders (données de référence) — upsert par code unique
  for (const leader of leaders) {
    await prisma.leader.upsert({
      where: { code: leader.code },
      update: {
        name: leader.name,
        colors: leader.colors,
        imageUrl: leader.imageUrl,
      },
      create: leader,
    });
  }

  // 2) Utilisateur de démo — upsert par email unique
  // ⚠️ password = placeholder. Le vrai hachage viendra avec l'US auth.
  const user = await prisma.user.upsert({
    where: { email: "demo@optcg.local" },
    update: {},
    create: {
      id: DEMO_USER_ID,
      email: "demo@optcg.local",
      username: "demo",
      password: "placeholder",
    },
  });

  // 3) Deck de démo — lié à un leader existant
  const zoro = await prisma.leader.findUniqueOrThrow({
    where: { code: "OP01-002" },
  });

  const deck = await prisma.deck.upsert({
    where: { id: DEMO_DECK_ID },
    update: {},
    create: {
      id: DEMO_DECK_ID,
      name: "Zoro Aggro (démo)",
      notes: "Deck de démonstration",
      decklist: { cards: [{ code: "OP01-025", quantity: 4 }] },
      userId: user.id,
      leaderId: zoro.id,
    },
  });

  // 4) Tournoi de démo
  const tournament = await prisma.tournament.upsert({
    where: { id: DEMO_TOURNAMENT_ID },
    update: {},
    create: {
      id: DEMO_TOURNAMENT_ID,
      name: "Locale du samedi (démo)",
      date: new Date("2026-01-10T14:00:00Z"),
      type: TournamentType.LOCAL,
      rounds: 4,
      userId: user.id,
    },
  });

  // 5) Match de démo — adversaire = Luffy
  const luffy = await prisma.leader.findUniqueOrThrow({
    where: { code: "OP01-001" },
  });

  await prisma.match.upsert({
    where: { id: DEMO_MATCH_ID },
    update: {},
    create: {
      id: DEMO_MATCH_ID,
      result: MatchResult.WIN,
      diceRollWon: true,
      wentFirst: true,
      score: "2-1",
      opponentName: "Joueur B",

      playerDeckName: deck.name,
      playerLeaderCode: zoro.code,
      playerLeaderName: zoro.name,
      opponentLeaderCode: luffy.code,
      opponentLeaderName: luffy.name,

      tournamentId: tournament.id,
      deckId: deck.id,
      opponentLeaderId: luffy.id,
    },
  });

  console.log("Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

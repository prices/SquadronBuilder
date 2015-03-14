//
// The core force cards are specified here
//
SquadronBuilder.force.characters = {
    Azonia: {
        name: "Azonia",
        mecha: [
            "Glaug", "GlaugEldare", "QueadluunRau"
        ],
        points: 5,
        factions: ["Zentraedi", "Malcontents"],
        modifyMecha: function (mecha)
        {
            mecha.abilities.Leadership = parseInt(mecha.abilities.Leadership, 10) + 1;
        }
    }
}

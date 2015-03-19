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
            mecha.changeAbility("Leadership", 1);
        },
        check: function (core)
        {
            mecha = core.getMecha();
            if (mecha.indexOf("Glaug") == -1) {
                return false;
            }
            return true;
        }
    }
}

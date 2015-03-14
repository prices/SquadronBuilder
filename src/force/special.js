//
// The special force cards are specified here
//
SquadronBuilder.force.special = {
     Glaug: {
        name: 'Glaug',
        mecha: {
            'Glaug': 1,
        },
        points: 20,
        upgrades: {
            'Glaug-Eldare': {
                desc: 'Upgrade the Glaug in the squadron to a Glaug-Eldare',
                points: 30,
            },
        },
        factions: ['Zentraedi'],
        check: function (core)
        {
            mecha = core.getMecha();
            if (isset(mecha['Glaug'])) {
            }
            return false;
        },
        upgrade: function (core, upgrade)
        {
            switch (upgrade) {
            case 'Glaug-Eldare':
                core.replaceMecha('Glaug', 'GlaugEldare');
                break;
            }
            return true;
        }

    },
    VF1S: {
        name: 'VF-1S Valkyrie',
        mecha: {
            'VF1SValkyrie': 1,
        },
        points: 30,
        upgrades: {
            'Valkyrie MLOPs': {
                points: 1,
            },
            'Valkyrie Long-Range Missiles': {
                points: 5,
            },
            'Valkyrie Gravity Bombs': {
                points: 3,
            },
            'SDF-1 Air Wing Nose Lasers': {
                points: 1,
            },
        },
        factions: ['UEDF'],
    },
    check: function (core)
    {
        return false;
    },
    upgrade: function (core, upgrade)
    {
        switch (upgrade) {
        }
        return true;
    }
    
}

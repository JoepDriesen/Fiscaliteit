var registratierecht_percentages = {
    groot: {
        brussel: 0.125,
        vlaanderen: 0.1,
        wallonie: 0.125,
    },
    klein: {
        brussel: 0.06,
        vlaanderen: 0.05,
        wallonie: 0.06,
    }
};

var erelonen_notaris_vastgoedakte = [
    [ 7500,      0.0456 ],
    [ 17500,   0.0285 ],
    [ 30000,  0.0228 ],
    [ 45495,  0.0171 ],
    [ 64095,  0.0114 ],
    [ 250095,  0.0057 ],
    [ Infinity, 0.00057 ],
];

var erelonen_notaris_kredietakte = [
    [ 7500,      0.0171 ],
    [ 17500,   0.01368 ],
    [ 30000,  0.00921 ],
    [ 45495,  0.00684 ],
    [ 64095,  0.00456 ],
    [ 250095,  0.00228 ],
    [ Infinity, 0.000456 ],
];

var belastingsvoordeel_lening_basis = 1520,
    belastingsvoordeel_lening_verhoging = 760,
    belastingsvoordeel_effectief = 0.4;
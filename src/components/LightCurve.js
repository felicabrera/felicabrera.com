// Kepler-style light curve: flat flux with a transit dip and a marker at its
// lowest point. "card" is the home teaser, "wide" the case page banner.
const curves = {
    card: {
        viewBox: "0 0 400 300",
        baseline: 110,
        marker: { cx: 182, cy: 203, r: 5 },
        points:
            "0,108 10,112 20,106 30,111 40,109 50,113 60,107 70,110 80,112 90,106 100,110 110,109 120,113 130,108 140,111 150,128 156,170 162,196 170,204 180,202 190,206 200,200 208,174 214,132 220,112 230,108 240,111 250,107 260,112 270,109 280,110 290,106 300,112 310,108 320,111 330,109 340,113 350,107 360,110 370,112 380,108 390,110 400,109",
    },
    wide: {
        viewBox: "0 0 800 300",
        baseline: 90,
        marker: { cx: 362, cy: 205, r: 7 },
        points:
            "0,88 20,92 40,86 60,91 80,89 100,93 120,87 140,90 160,92 180,86 200,90 220,88 240,93 260,89 280,91 300,110 312,160 324,196 340,206 360,204 380,208 400,201 416,170 428,118 440,92 460,88 480,91 500,87 520,92 540,89 560,90 580,86 600,92 620,88 640,91 660,89 680,93 700,87 720,90 740,92 760,88 780,90 800,89",
    },
};

export default function LightCurve({ variant = "card" }) {
    const c = curves[variant];
    const width = Number(c.viewBox.split(" ")[2]);
    return (
        <svg aria-hidden="true" viewBox={c.viewBox} preserveAspectRatio="none">
            <line
                x1="0"
                y1={c.baseline}
                x2={width}
                y2={c.baseline}
                stroke="#111"
                strokeOpacity=".18"
                strokeDasharray="3 5"
                vectorEffect="non-scaling-stroke"
            />
            <polyline fill="none" stroke="#111" strokeWidth="1.6" points={c.points} vectorEffect="non-scaling-stroke" />
            <circle {...c.marker} fill="var(--accent)" />
        </svg>
    );
}

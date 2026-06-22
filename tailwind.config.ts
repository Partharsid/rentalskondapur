const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deep: "#060810",
        obsidian: "#0d1117",
        matte: "#161b22",
        surface: "#1a2033",
        emerald: {
          DEFAULT: "#10B981",
          glow: "rgba(16, 185, 129, 0.15)",
        },
        gold: {
          DEFAULT: "#F59E0B",
          glow: "rgba(245, 158, 11, 0.15)",
        },
      },
      fontFamily: {
        sans: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        marquee: "marquee 35s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

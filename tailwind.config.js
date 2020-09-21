const mode = process.env.NODE_ENV;
const dev = mode === 'development';
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    // TODO: Enable on production, ensure it re-parses when classes are added/removed
    enabled: !dev,
    content: ["./src/**/*.html", "./src/**/*.svelte", "./src/**/*.svx",
     "./test/**/*.svelte", "./test/**/*.svx"],
  },
  theme: {
    extend: {
      borderWidth: {
          '1': '1px'
      },
      gridTemplateColumns: {
        'subgrid': 'subgrid',
      },
      gridTemplateRows: {
        'subgrid': 'subgrid'
      },
      gridColumn: {
        'all': '1 / -1'
      },
      gridRow: {
        'all': '1 / -1'
      }
    },
  }, 
  variants: {},
  plugins: [],
};

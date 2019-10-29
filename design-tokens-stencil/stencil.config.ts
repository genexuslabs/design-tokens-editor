import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'design-tokens-stencil',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  plugins: [
    sass({
      injectGlobalPaths: [
        'src/globals/general.scss',
        'src/globals/mixins.scss',
        'src/globals/normalize.scss',
        'src/globals/tokens-borders.scss',
        'src/globals/tokens-colors.scss',
        'src/globals/tokens-fonts.scss',
        'src/globals/tokens-form.scss',
        'src/globals/tokens-icons.scss',
        'src/globals/tokens-outlines.scss',
        'src/globals/tokens-spacing.scss'
      ]
    })
  ]
};

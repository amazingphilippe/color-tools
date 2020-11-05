# Yet another color scale generator?

This time, color scales are generated based on the contrast between color variants. The contrast value calculated is using the WCAG formula based on relative luminance, which makes it easy to generate colors that pass specific contrast ratios within a scale.

This all sounds awesome, but this is more of a learning tool. As you'll see, contrast ratios are not linear and it makes it difficult to generate palettes with passing contrast in mind. Welp.

## Built on next js with MDX

The MDX is superfluous, but is great for creating documentation as the tool evolves.

## Whats powering this thing

[Chroma js](https://gka.github.io/chroma.js) is a big part of this tool. It provides all the color functions to calculate luminance and generate color scales.

[Chakra ui](https://next.chakra-ui.com/) provides the ui components.

[randomcolor](https://github.com/davidmerfield/randomColor) is a neat random color generator, because normal randomness isn't good enough.

[color-namer](https://github.com/colorjs/color-namer) to find delicious color names. You can still choose your own names tho.

## Try it out

This tool is not yet deployed, in the meantime, you can try it out by cloning this repo and running `npm run dev`

import { Box, theme, useSlider } from "@chakra-ui/core";

export const ChannelSlider = (props) => {
  const hoverColor = theme.colors.black;
  const focusColor = theme.colors.orange[300];

  const {
    getInputProps,
    getRootProps,
    getTrackProps,
    getInnerTrackProps,
    getThumbProps,
    getMarkerProps,
  } = useSlider(props);

  const input = getInputProps();
  const root = getRootProps();
  const track = getTrackProps();
  const innerTrack = getInnerTrackProps();
  const thumb = getThumbProps();

  return (
    <Box h={10} w="100%" {...root}>
      <input {...input} />
      <Box {...track}>
        <Box {...innerTrack} />
      </Box>
      <Box
        {...thumb}
        boxSize={8}
        boxShadow="none"
        border="2px"
        borderColor="black"
        transition="width 0.2s, height 0.2s"
        transformOrigin="center"
        transform="translateY(-50%) "
        _hover={{
          boxShadow: `0 0 0 1px ${hoverColor}`,
        }}
        _active={{
          transform: "translateY(-50%) translateX(+4px)",
          boxSize: 8,
          boxShadow: "none !important",
        }}
        _focus={{
          boxShadow: `0 0 0 1px ${hoverColor}, 0 0 0 4px ${focusColor}`,
        }}
      />
    </Box>
  );
};

/**
 * This component exists only because I couldn't get the Chakra slider to work with the State provider.
 */

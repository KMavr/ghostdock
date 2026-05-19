type DemoInput = {
  homepage: string | null;
  readmeRaw: string | null;
};

export const parseDemoUrl = (input: DemoInput): string | null => {
  if (input.homepage) {
    return input.homepage;
  }

  if (input.readmeRaw) {
    const labelRegex =
      /\[([^\]]*(?:demo|live|try|playground|preview)[^\]]*)\]\((https?:\/\/[^)]+)\)/i;
    const liveAtRegex = /live\s+at\s+\*{0,2}\[([^\]]+)\]\((https?:\/\/[^)]+)\)/i;

    return labelRegex.exec(input.readmeRaw)?.[2] ?? liveAtRegex.exec(input.readmeRaw)?.[2] ?? null;
  }

  return null;
};

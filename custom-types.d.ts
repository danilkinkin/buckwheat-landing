type StaticImageData = {
  src: string;
  height: number;
  width: number;
  placeholder?: string;
};

declare module "*.svg?url" {
  const content: StaticImageData;
  export default content;
}

declare module "*.glsl?raw" {
  const content: string;
  export default content;
}

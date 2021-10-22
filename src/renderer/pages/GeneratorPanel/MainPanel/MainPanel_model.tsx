import { ImageGenerator } from "../../../services/ImageGenerator/ImageGenerator";




export class MainPanelModel {

  imageGenerator: ImageGenerator;
  /**
   *
   */
  constructor() {
    this.imageGenerator = new ImageGenerator({
      width: 1000,
      height: 1000,
      dir: "./",
      description: "This is an NFT made by the coolest generative code.",
      baseImageUri: "https://hashlips/nft",
      startEditionFrom: 1,
      endEditionAt: 10,
      editionSize: 10,
      outputDir: "./_output/",
      raceWeights: [
        {
          value: "skull",
          from: 1,
          to: 10,
        }
      ]
    });
  }
  onMount = () => {
  }
  onUnmount = () => {

  }

  generate = () => {
    this.imageGenerator.startCreating(races)
  }
}




const dir = `/Users/gera/Projects/nft-image-generator/_input`;
console.log(dir);
const races = {
  skull: {
    name: "Skull",
    layers: [
      {
        name: "Background",
        elements: [
          {
            id: 0,
            name: "Light blue",
            path: `${dir}/1-background/LightBlue.png`,
            weight: 100,
          },
          {
            id: 1,
            name: "Orange",
            path: `${dir}/1-background/Orange.png`,
            weight: 80,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: 1000, height: 1000 },
      },
      {
        name: "Suit",
        elements: [
          {
            id: 0,
            name: "Regular",
            path: `${dir}/2-suit/Regular.png`,
            weight: 100,
          },
          {
            id: 1,
            name: "Orange",
            path: `${dir}/2-suit/Orange.png`,
            weight: 20,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: 1000, height: 1000 },
      },
      {
        name: "Shoulder",
        elements: [
          {
            id: 0,
            name: "LunaFlag",
            path: `${dir}/3-shoulder/LunaFlag.png`,
            weight: 100,
          },
          {
            id: 1,
            name: "USA",
            path: `${dir}/3-shoulder/USA.png`,
            weight: 90,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: 1000, height: 1000 },
      },
      {
        name: "Pin",
        elements: [
          {
            id: 0,
            name: "Smiley",
            path: `${dir}/4-pin/Smiley.png`,
            weight: 100,
          },
          {
            id: 1,
            name: "LunaBluePin",
            path: `${dir}/4-pin/LunaBluePin.png`,
            weight: 90,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: 1000, height: 1000 },
      },
      {
        name: "Race",
        elements: [
          {
            id: 0,
            name: "Skull",
            path: `${dir}/5-skin/Skull.png`,
            weight: 100,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: 1000, height: 1000 },
      },
      {
        name: "Facial hair",
        elements: [
          {
            id: 0,
            name: "No facial hair",
            path: `${dir}/6-facial-hair/NoFacialHair.png`,
            weight: 100,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: 1000, height: 1000 },
      },
      {
        name: "Mask",
        elements: [
          {
            id: 0,
            name: "No mask",
            path: `${dir}/7-mask/NoMask.png`,
            weight: 100,
          },
          {
            id: 1,
            name: "Medical",
            path: `${dir}/7-mask/mask.png`,
            weight: 5,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: 1000, height: 1000 },
      },
      {
        name: "Hair",
        elements: [
          {
            id: 0,
            name: "Blonde bun",
            path: `${dir}/8-hair/BlondeBun.png`,
            weight: 100,
          },
          {
            id: 1,
            name: "Pink",
            path: `${dir}/8-hair/Pink.png`,
            weight: 91,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: 1000, height: 1000 },
      },
      {
        name: "Accessories",
        elements: [
          {
            id: 0,
            name: "No accessories",
            path: `${dir}/9-accessories/NoAcc.png`,
            weight: 100,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: 1000, height: 1000 },
      },
      {
        name: "Headwear",
        elements: [
          {
            id: 0,
            name: "Glass dome",
            path: `${dir}/10-headwear/GlassDome.png`,
            weight: 100,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: 1000, height: 1000 },
      },
    ],
  },
};
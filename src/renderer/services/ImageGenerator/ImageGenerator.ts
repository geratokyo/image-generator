// import * as fs from "fs";
import {
  Canvas,
  createCanvas,
  loadImage,
  NodeCanvasRenderingContext2D,
} from "canvas";
import { ImageGeneratorConfig } from "./ImageGenerator_config";
import * as fs from "fs";
// import * as electron from "electron";
// const fs = window.require("fs");

const EXPORT_FILE_FORMAT = "png";

export class ImageGenerator {
  metadataList: any[] = [];
  attributesList: any[] = [];
  dnaList: any[] = [];
  config: ImageGeneratorConfig;
  ctx: NodeCanvasRenderingContext2D;
  canvas: Canvas;
  /**
   *
   */
  constructor(config: ImageGeneratorConfig) {
    this.setConfig(config);
  }

  setConfig = (config: ImageGeneratorConfig) => {
    if (
      !this.config ||
      !this.config.width ||
      !this.config.height ||
      this.config.width !== config.width ||
      this.config.height !== config.height
    ) {
      this.canvas = createCanvas(config.width, config.height);
      this.ctx = this.canvas.getContext("2d");
    }
    this.config = { ...this.config, ...config };
  };

  saveImage = (_editionCount: number) => {
    fs.writeFileSync(
      `${this.config.outputDir}${_editionCount}.${EXPORT_FILE_FORMAT}}`,
      this.canvas.toBuffer("image/png")
    );
  };

  signImage = (_sig: any) => {
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = "bold 30pt Verdana";
    this.ctx.textBaseline = "top";
    this.ctx.textAlign = "left";
    this.ctx.fillText(_sig, 40, 40);
  };

  genColor = () => {
    let hue = Math.floor(Math.random() * 360);
    let pastel = `hsl(${hue}, 100%, 85%)`;
    return pastel;
  };

  drawBackground = () => {
    this.ctx.fillStyle = this.genColor();
    this.ctx.fillRect(0, 0, this.config.width, this.config.height);
  };

  addMetadata = (_dna: any, _edition: any) => {
    let dateTime = Date.now();
    let tempMetadata = {
      dna: _dna.join(""),
      name: `#${_edition}`,
      description: this.config.description,
      image: `${this.config.baseImageUri}/${_edition}.${EXPORT_FILE_FORMAT}}`,
      edition: _edition,
      date: dateTime,
      attributes: this.attributesList,
    };
    this.metadataList.push(tempMetadata);
    this.attributesList = [];
  };

  addAttributes = (_element: any) => {
    let selectedElement = _element.layer.selectedElement;
    this.attributesList.push({
      trait_type: _element.layer.name,
      value: selectedElement.name,
    });
  };

  loadLayerImg = async (_layer: any) => {
    return new Promise(async (resolve) => {
      const image = await loadImage(`${_layer.selectedElement.path}`);
      resolve({ layer: _layer, loadedImage: image });
    });
  };

  drawElement = (_element: any) => {
    this.ctx.drawImage(
      _element.loadedImage,
      _element.layer.position.x,
      _element.layer.position.y,
      _element.layer.size.width,
      _element.layer.size.height
    );
    this.addAttributes(_element);
  };

  constructLayerToDna = (_dna: any[] = [], _races: any[] = [], _race: any) => {
    let mappedDnaToLayers = (_races[_race] as any).layers.map(
      (layer: any, index: number) => {
        let selectedElement = layer.elements.find(
          (e: any) => e.id === _dna[index]
        );
        return {
          name: layer.name,
          position: layer.position,
          size: layer.size,
          selectedElement: selectedElement,
        };
      }
    );

    return mappedDnaToLayers;
  };

  getRace = (_editionCount: any) => {
    let race = "No Race";
    this.config.raceWeights.forEach((raceWeight: any) => {
      if (_editionCount >= raceWeight.from && _editionCount <= raceWeight.to) {
        race = raceWeight.value;
      }
    });
    return race;
  };

  isDnaUnique = (_DnaList: any[] = [], _dna: any[] = []) => {
    let foundDna = _DnaList.find((i: any) => i.join("") === _dna.join(""));
    return foundDna === undefined ? true : false;
  };

  createDna = (_races: any, _race: any) => {
    let randNum: any[] = [];
    _races[_race].layers.forEach((layer: any) => {
      let randElementNum = Math.floor(Math.random() * 100) + 1;
      let num = 0;
      layer.elements.forEach((element: any) => {
        if (randElementNum >= 100 - element.weight) {
          num = element.id;
        }
      });
      randNum.push(num);
    });
    return randNum;
  };

  writeMetaData = (_data: any) => {
    console.log(fs);
    fs.writeFileSync(`${this.config.outputDir}_metadata.json`, _data);
  };

  saveMetaDataSingleFile = (_editionCount: any) => {
    fs.writeFileSync(
      `${this.config.outputDir}${_editionCount}.json`,
      JSON.stringify(
        this.metadataList.find((meta) => meta.edition === _editionCount)
      )
    );
  };

  startCreating = async (races) => {
    this.writeMetaData("");
    let editionCount = this.config.startEditionFrom;
    while (editionCount <= this.config.endEditionAt) {
      console.log(editionCount);
      let race = this.getRace(editionCount);
      let newDna = this.createDna(races, race);

      if (this.isDnaUnique(this.dnaList, newDna)) {
        let results = this.constructLayerToDna(newDna, races, race);
        let loadedElements: any[] = []; //promise array
        results.forEach((layer: any) => {
          loadedElements.push(this.loadLayerImg(layer));
        });

        await Promise.all(loadedElements).then((elementArray) => {
          this.ctx.clearRect(0, 0, this.config.width, this.config.height);
          // drawBackground();
          elementArray.forEach((element) => {
            this.drawElement(element);
          });
          this.signImage(`#${editionCount}`);
          this.saveImage(editionCount);
          this.addMetadata(newDna, editionCount);
          this.saveMetaDataSingleFile(editionCount);
          console.log(
            `Created edition: ${editionCount}, Race: ${race} with DNA: ${newDna}`
          );
        });
        this.dnaList.push(newDna);
        editionCount++;
      } else {
        console.log("DNA exists!");
      }
    }
    this.writeMetaData(JSON.stringify(this.metadataList));
  };
}

// startCreating();

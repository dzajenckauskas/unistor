export function boxes(el) {
   let ret = [];

   let packingMaterials = [
      {
         pos: "mediumBoxEmpty",
         name: "Medium box",
      },
      {
         pos: "largeBoxEmpty",
         name: "Large box",
      },
      {
         pos: "packingTape",
         name: "Packing tape",
      },
   ];
   let storage = [
      {
         pos: "smallBox",
         name: " Small box",
      },
      {
         pos: "mediumBox",
         name: " Medium box",
      },
      {
         pos: "largeBox",
         name: " Large box",
      },
      {
         pos: "mediumSuitcase",
         name: " Medium suitcase",
      },
      {
         pos: "largeSuitcase",
         name: " Large suitcase",
      },
      {
         pos: "bike",
         name: "bike",
      },
      {
         pos: "guitar",
         name: "guitar",
      },
      {
         pos: "keyboard",
         name: "keyboard",
      },
      {
         pos: "tv",
         name: "tv",
      },
      {
         pos: "clothesRack",
         name: "Clothes rack",
      },
      {
         pos: "ironingBoard",
         name: "Ironing board",
      },
      {
         pos: "otherSmallItem",
         name: "Small item",
      },
   ];

   if (el.packingMaterials) {
      for (const mt of packingMaterials) {
         if (el[mt.pos]) {
            ret.push(
               <div className="classname" key={mt.name}>{`${
                  mt.name
               }: ${el[mt.pos]}`}</div>
            );
         }
      }
   }
   if (el.state?.storage) {
      for (const mt of storage) {
         if (el.state.storage[mt.pos]) {
            ret.push(
               <div className="classname" key={mt.name}>{`${
                  mt.name
               }: ${el.state.storage[mt.pos]}`}</div>
            );
         }
      }
   }

   return ret;
}

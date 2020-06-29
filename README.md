# Teaspring

Problem description:
* Number of layers each specifying a color and a volume is provided.
* An inventory of inks, each of which has a color and a cost per unit volume is provided.
* For each layer, we should select an ink from inventory to print a t-shirt.

Calculate Color difference:

**Option1**
* We can calculate the color difference as the Euclidean distance between each RBG ink color and the RGB.

```
function colorDistance2d(v1, v2){
  let i,  d = 0
  for (i = 0; i < v1.length; i++) {
      d += (v1[i] - v2[i])*(v1[i] - v2[i])
  }
  return Math.sqrt(d)
}
```

**Option2** (More accurate and lower time complexity):
* we can calculate the color difference as the 3 dimensional distance between each RBG ink color and the RGB.

1) Convert all hex colors in inventory to RGB, **O(n)** for n color in inventory
#0B40F1 -> rgb(11, 64, 241)
```
{
  "inks": [
    {
      "id": "VN1348",
      "color": "#17B0D8",
      "cost": 12.39
    },
    {
      "id": "FW4037",
      "color": "#0B40F1",
      "cost": 9.66
    },
    ...
  ]
}
```

2) Create and store list of 3 dimensional point (Red, Green, Blue) in kd-tree, **O(kn log n)**
3) Store the kd-Tree in memory cache to avoid recalculation
```
function colorDistance3d(a, b) {
  let dr = a.red - b.red
  let dg = a.green - b.green
  let db = a.blue - b.blue
  let redMean = (a.red + b.red)/2
  return (2+redMean/256)*dr*dr + 4*dg*dg + (2 + (255 - redMean)/256)*db*db
}

const tree = new kdTree(inventoryColorToHex(inventory), colorDistance3d, ["red", "green", "blue"])
const nearest = CachedKdTree.nearest(targetColorRgbA, limit)
```

4) Get the color layers from Question 
```
{
  "scenario_id": "ade831c4-dd44-4205-b21b-1ac5304ebf75",
  "questions": [
    {
      "layers": [
        {
          "color": "#56613F",
          "volume": 2.4258338848165577
        }
      ]
    }
  ]
}
```
5) Search the kd-tree to find the closest colors(neighbours), **O(log n)**


* k-d tree (short for k-dimensional tree) is a space-partitioning data structure for organizing points in a k-dimensional space.

<img src="/img/3dtree.png" width="30%">.

* k-d tree implementation is borrowed from https://github.com/ubilabs/kd-tree-javascript


**Technologies that is used**
* React
* MongoDB
* Mongoose
* Apollo Client
* Apollo Server
* memory-cache

## Running
Install, configure and run default mongodb

1) On Terminal one navigate to client folder and run:
`npm run start`
or for hot module reloading
`nodemon`

2) On Terminal two navigate to server folder and run:
`npm run start`
or for hot module reloading
`nodemon`


Navigate to:
`http://localhost:3000/`

![Alt text](/img/teaspring1.png "teaspring")

![Alt text](/img/teaspring2.png "teaspring")


```
query inventoryAndQuestions {
  inventory {
    inks {
      id
      color
      cost
      createdAt
      updatedAt
    }
  }
  questions {
    scenario_id
    questions {
      layers {
        color
        volume
      }
    }
  }
}

mutation calculateColor {
  calculateNearestColors(
    color: "#19BB27",
    volume: 2.4258338848165577,
    limit: 10
  ) {
    nearest {
      red
      green
      blue
      a
      id
      color
      cost
      volume
      threeDDistance
      twoDDistance
      volumeCost
    }
    kdTree
  }  
}

mutation postingAnswer {
	postAnswers(scenario_id: "ade831c4-dd44-4205-b21b-1ac5304ebf75") {
		scenario_id
    answers {
      inks 
    }
  }
}

query batchDataLoader {
  batchQuery(scenario_id: "ade831c4-dd44-4205-b21b-1ac5304ebf75", 
    ids:[
      "#0da826","#022456","#0129a9","#00c32a","#033d60","#0eac84","#027a40","#0c3884","#0af6cb","#02e0c6","#02e36b","#0851c5",
      "#00aaca","#0bac5e","#0e17bb","#0b8f07","#053577","#0297cf","#0c4af7","#024e53","#0bd675","#0a5933","#0db9c5","#071506",
      "#0788f3","#0e7127","#0234c0","#0bd490","#03cb51","#06d3da","#046022","#0664dd","#0aa4d9","#0b34de","#095a80","#071c0b",
      "#0963f4","#0d6814","#03f5f2","#094b8f","#061893","#079c4c","#05b594","#0682cb","#071315","#073cda","#0ddd7a","#03641f",
      "#0ef266","#04b5c5","#0721f1","#000577","#0b6454","#0a8b68","#064c2c","#0b9e57","#074f39","#011776","#009727","#0b5437",
      "#09e532","#0acdda","#05959c","#0f4071","#047ad8","#021708","#0453f5","#065c41","#03b868","#07e975","#058163","#0ab908",
      "#0764d0","#014cf0","#003815","#0976ac","#099923","#09bc0e","#07ae4a","#048601","#02e1e2","#016a9c","#044878","#0785ce",
      "#0a28b3","#0eab0b","#0ce4ec","#03cf26","#0f37f6","#015edc","#0dfa36","#0b4ee0","#08c9e1","#08d2ca","#005350","#0e3bc4",
      "#057404","#0aa387","#043bfa","#06c4ad","#0889bd","#08ce97","#05197e","#0655ff","#0849b3","#0c4ed1","#0ebb85","#0847fb",
      "#05719c","#0b43c9","#037715","#06ef2e","#0b2c2a","#07e1ae","#0b4aa3","#0da8b3","#026490","#0dcb1e","#0d4373","#08ff32",
      "#054952","#064eff","#02f33f","#0412a5","#07c415","#0dee6c","#035111","#051cbf","#091c48","#053901","#0800f7","#0971b8",
      "#02e10a","#0583e0","#0623cc","#0067a9","#02cbca","#01432a","#068e31","#07f379","#0b5654","#00f380","#03fedd","#0c68e5",
      "#018b89","#07c6ec","#090619","#08f873","#0ea743","#0e99d5","#022554","#088f9b","#0590c2","#01032a","#069fb0","#08ec30",
      "#036ead","#061739","#07e0c8","#0a137a","#07f890","#05f6aa","#0087fb","#08c5cb","#07b511","#0d62de","#073bb1","#0d885d",
      "#0ca44b","#0bb610","#06e4d2","#027a9f","#0caa98","#071368","#019bc2","#0033dd","#031591","#0ba2b1","#046d44","#0b9f42",
      "#039abb","#0af27f","#00d43a","#05049b","#0209f5","#0919bd","#030197","#07207c","#021eaa","#044c9f","#08e792","#0cb6b7",
      "#01b07f","#0bc3dd","#018022","#0ed354","#0624e7","#0ac648","#010d6c","#003940"
    ]) {
    scenario_id
    answers {
      inks
    }
  }
}

```





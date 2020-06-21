# Teaspring

Problem description:
* A question, with a number of layers each specifying a color and a volume.
* An inventory of inks, each of which has a color and a cost per unit volume.
* For each layer in the question, select an ink from our inventory which we should use to print a t-shirt!

Color difference:
Option1:
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

Option2 (More accurate and lower time complexity):
* we can calculate the color difference as the 3 dimensional distance between each RBG ink color and the RGB.

1) Convert all hex colors in inventory to RGB, O(n) for n color in inventory
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

2) Create and store list of 3 dimensional point (Red, Green, Blue) in kd-tree 
, O(kn log n)
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
5) Search the kd-tree to find the closest colors(neighbours), O(log n)


* k-d tree (short for k-dimensional tree) is a space-partitioning data structure for organizing points in a k-dimensional space.
![Alt text](/img/3dtree.png =50x50)

* k-d tree implementation is borrowed from https://github.com/ubilabs/kd-tree-javascript


Technologies that is used:
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








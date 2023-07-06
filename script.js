function load_image_gallery(url, imgNames, videoUrls) {
    // Create container div
    d1 = document.createElement("div");
    d1.classList.add('imageGallery');
    document.body.appendChild(d1);

    d1.id = 'thisImageGallery';
    // console.log('yolo', nodeIdx, thisImgNames.length);
    
    // Add images
    for (var i = 0; i < imgNames.length; i++) {
        img = document.createElement("img")
        path = 'img/' + url + '/' + imgNames[i]
        // console.log('brrr', path);

        img.src = path
        d1.appendChild(img)
    }

    // Add videos if any
    if (videoUrls !== undefined) {
        for (var i = 0; i < videoUrls.length; i++) {
            vid = document.createElement("iframe")
            vid.src = videoUrls[i]
            // vid.width=300
            // vid.height=200
            d1.appendChild(vid)
        }
    }

    // Create closing cross
    s1 = document.createElement("span");
    s1.textContent = 'X';
    d1.addEventListener('click', function() {
        document.getElementById("thisImageGallery").remove();
    }, false);
    d1.appendChild(s1);
}


function load_node_view(event) {
    nodeIdx = event.currentTarget.cityIndex;
    thisImgNames = cityImages[nodeIdx]['Images']
    load_image_gallery(cityData[nodeIdx]['url'], thisImgNames)
}


function load_edge_view(event) {
    nodeIdx = event.currentTarget.routeIndex;
    thisImgNames = routeImages[nodeIdx]['Images']
    thisVideoUrls = routeImages[nodeIdx]['Videos']
    load_image_gallery(routeData[nodeIdx]['url'], thisImgNames, thisVideoUrls)
}


// Process Nodes
nodeList = [];
for (var i = 0; i < cityData.length; i++) {

    // Create div element of correct class, append it to the body
    d1 = document.createElement("div");
    d1.classList.add('fancyBox');
    d1.style.top = cityData[i]['top'];
    d1.style.right = cityData[i]['right'];
    d1.innerHTML = cityData[i]['Label'];
    d1.cityIndex = i;
    document.body.appendChild(d1);
    nodeList.push(d1);

    // Load related images on click
    // d1.onclick = function() { load_node_view(i); }
    d1.addEventListener('click', load_node_view, false);

    // Get all images in the corresponding folder
    console.log(cityData[i]['Label']);
}


// Process Edges
edgeList = []
for (var i = 0; i < routeData.length; i++) {
    thisRoute = routeData[i]

    // https://anseki.github.io/leader-line/
    var line = new LeaderLine(
        nodeList[thisRoute['Src']],
        nodeList[thisRoute['Trg']],
        {
            startPlugColor: '#1a6be0',
            endPlugColor: '#1efdaa',
            gradient: true,
            size: 15,
            middleLabel: LeaderLine.captionLabel({text: thisRoute['Label'], color: 'black'})
            // middleLabel: LeaderLine.captionLabel(thisRoute['Label'], color='#ffffff')  //thisRoute['Label'], //LeaderLine.pathLabel(thisRoute['Label'])
        }
    );

    thisLine = document.querySelector('.leader-line:last-of-type')
    thisLine.routeIndex = i;
    thisLine.addEventListener('click', load_edge_view, false);
}
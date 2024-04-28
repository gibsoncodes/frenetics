import React, {useState, useEffect, useRef} from 'react'

const HeaderAnim = () => {
    const angleType = 1;  // 1 or 2 // 
    const lengthModifier = 1; // 1 is default this is a multiplier.
    const differentBackgrounds = "#000";
    const lineColor = "random" // "random" for many different colors;
    const lineWidth = 6// 2 default or "random" for effect
    const chaosMode = true;

    const maxLines = 50;


    function calculateEndpoint(startPoint, length, angle, startQuad) {
        // Convert angle to radians
        let angleRad = angle * (Math.PI / 180);
        let xOp;
        let yOp;
        if (startQuad === "right") {
            xOp = angleType === 2 ? -1 : 1
            yOp = 1
        } else if (startQuad === 'left') {
            xOp = angleType === 2 ? -1 : 1
            yOp = 1
        } else if (startQuad === 'bottom') {
            xOp = 1;
            yOp = -1;
        } else {
            xOp = 1;
            yOp = -1
        }
    
        // Calculate the end point
        // let endY = startPoint.y - length * Math.sin(angleRad);
        // let endX = startPoint.x + length * Math.cos(angleRad);

        let endY = startPoint.y + (yOp * (length * Math.sin(angleRad)));
        let endX = startPoint.x + (xOp * (length * Math.cos(angleRad)));
    
        return { x: Math.round(endX), y: Math.round(endY) };
    }

    function formData(startPoint, length, angle, sQuad) {
        let quad = ["bottom", "right", "top", "left"]
        let endP = calculateEndpoint(startPoint, length, angle, quad[sQuad]);
        return [startPoint.x, startPoint.y, endP.x, endP.y, angle, true];

    }

    function onDifferentSides(line1, line2) {
        let dx1 = line1[2] - line1[0];
        let dy1 = line1[3] - line1[1];
        let dx2 = line2[2] - line2[0];
        let dy2 = line2[3] - line2[1];
        
        let delta = dx1 * dy2 - dy1 * dx2;
        if (delta === 0) return false; // lines are parallel or coincident
    
        let s = (dx1 * (line2[1] - line1[1]) + dy1 * (line1[0] - line2[0])) / delta;
        let t = (dx2 * (line1[1] - line2[1]) + dy2 * (line2[0] - line1[0])) / -delta;
    
        return s >= 0 && s <= 1 && t >= 0 && t <= 1;
    }
    
    function doesLineIntersect(lines, newLine) {
        return lines.some(line => onDifferentSides(line, newLine));
    }

    const svgWidth = 600;
    const treeStart = [{x:(svgWidth / 2), y: svgWidth}, {x:svgWidth, y: svgWidth / 2}, {x:(svgWidth / 2), y: 0}, {x:0, y: svgWidth / 2}];
    const maxLimbs = 50;
    
    function generateLines() {
        let quad = Math.floor(Math.random() * 4)
        // let quad = 3

        let lines = [];
        let limbCount = Math.ceil(Math.random() * maxLimbs) + 1;
        let continueBranch = true; 
        let trunk = getStartBranch(quad);
        lines.push(trunk);
        function newBranch(data) {
            let currBranch = data;
            if (lines.length > maxLines) return;
            if (checkValidLine(currBranch, lines)) {
                lines.push(currBranch);
            } else {
                return
            }
            let kg = true;
            while (kg) {
                let moreRoot = Math.random() > .5;
                let split1 = Math.random() > .5;
                let split2 = Math.random() > .5;
                let mirror = Math.random() > .4;
                if (lines.length > maxLimbs) break;
                if (mirror) {
                 
                        let b1 = getAngle(currBranch[4], quad);
                        let b2 = currBranch[4] > b1 ? currBranch[4] + (currBranch[4] - b1) : currBranch[4] - (b1 - currBranch[4]);
                        let d1 = formData({x: currBranch[2], y: currBranch[3]}, getLength(), b1, quad);
                        let d2 = formData({x: currBranch[2], y: currBranch[3]}, getLength(), b2, quad);
                        if (checkValidLine(d1, lines) && checkValidLine(d2, lines)) {
                            newBranch(d1);
                            newBranch(d2);
                        } else {
                            break;
                        }
                    
                    
                } else {
                    if (split1) {
                        
                        let b1 = getAngle(currBranch[4], quad);
                        let d1 = formData({x: currBranch[2], y: currBranch[3]}, getLength(), b1, quad);
                        if (checkValidLine(d1, lines)) {
                            newBranch(d1);
                        } else {
                            break;
                        }
                    }
                    if (split2) {
                     
                        let b1 = getAngle(currBranch[4], quad);
                        let d1 = formData({x: currBranch[2], y: currBranch[3]}, getLength(), b1, quad);
                        if (checkValidLine(d1, lines)) {
                            newBranch(d1);
                        } else {
                            break;
                        }
               
                    }
                }
    
                if (!moreRoot) {
                    kg = false;
                } else {
                    currBranch = formData({x: currBranch[2], y: currBranch[3]}, getLength(), currBranch[4], quad);
                    if (checkValidLine(currBranch, lines)) {
                        lines.push(currBranch);
                    } else {
                        break;
                    }
                }
    
            }
        }
        while (continueBranch) {
            let moreRoot = Math.random() > .3;
            let split1 = Math.random() > .5;
            let split2 = Math.random() > .5;
            let split3 = Math.random() > .5;
            let split4 = Math.random() > .5;
            let mirror = Math.random() > .5;
            if (mirror) {
                let b1 = getAngle(trunk[4], quad);
                let b2 = trunk[4] > b1 ? trunk[4] + (trunk[4] - b1) : trunk[4] - (b1 - trunk[4]);
                let d1 = formData({x: trunk[2], y: trunk[3]}, getLength(), b1, quad);
                let d2 = formData({x: trunk[2], y: trunk[3]}, getLength(), b2, quad);
                newBranch(d1);
                newBranch(d2);
            } else {
                if (split1) {
                    let b1 = getAngle(trunk[4], quad);
                    let d1 = formData({x: trunk[2], y: trunk[3]}, getLength(), b1, quad);
                    newBranch(d1);
                }
                if (split2) {
                    let b1 = getAngle(trunk[4], quad);
                    let d1 = formData({x: trunk[2], y: trunk[3]}, getLength(), b1, quad);
                    newBranch(d1);
                }
                // if (split3) {
                //     let b1 = getAngle(trunk[4]);
                //     let d1 = formData({x: trunk[2], y: trunk[3]}, getLength(), b1);
                //     newBranch(d1);
                // }
                // if (split4) {
                //     let b1 = getAngle(trunk[4]);
                //     let d1 = formData({x: trunk[2], y: trunk[3]}, getLength(), b1);
                //     newBranch(d1);
                // }
            }

            if (!moreRoot) {
                continueBranch = false;
            } else {
                trunk = formData({x: trunk[2], y: trunk[3]}, getLength(), trunk[4], quad);
                if (checkValidLine(trunk, lines)) {
                    lines.push(trunk);
                } else {
                    break;
                }
            }

        }
        return lines;
    }

    function checkValidLine(point, allLines) {
        if (point[2] > 550 || point[2] < 50) return false;
        if (point[3] > 550 || point[3] < 50) return false;
        // if (doesLineIntersect(allLines, point)) {
        //     console.log("intersect")
        //     return false;
        // }
        return true;
    }

    function getAngle(currentAngle, quad) {
        if (angleType === 1) {
            let workingAngle = currentAngle;
            let decider = Math.random();
            let flagAngle;
            if (decider > .9) {
                flagAngle = 150;
            } else if (decider > .7) {
                flagAngle = 70;
            } else if (decider > .5) {
                flagAngle = 60;
            } else {
                flagAngle = 30
            }
            // while (Math.abs(workingAngle - currentAngle) < 6) {
            //     workingAngle = (Math.random() * flagAngle) + (currentAngle - (flagAngle / 2));
            // }
            // console.log(workingAngle)
            switch (quad) {
                case 0: // Top
                case 2: // Bottom
                    while (Math.abs(workingAngle - currentAngle) < 6) {
                        workingAngle = (Math.random() * flagAngle) + (currentAngle - (flagAngle / 2));
                    }
                    break;
                case 1: // Right
                case 3: // Left
                    while (Math.abs(workingAngle - currentAngle) < 6) {
                        // Adjust the angle calculation for horizontal lines
                        workingAngle = currentAngle + (Math.random() - 0.5) * flagAngle;
                    }
                    break;
                    default:
                        break;
            }
            return workingAngle;
        } else {
            let decider = Math.random() > .3 ? 0 : 50;
            return (Math.random() * (180 + decider)) + ((360 - (quad * 90)) - (decider / 2));
        }
    }


    
    

    function getStartBranch(startQuad) {
        let angle = (Math.random() * 30) + (90 * (1 +startQuad)) - 15;
        let startModX = Math.random() * 100
        let startX = startQuad % 2 === 0 ? Math.random() > .5 ? treeStart[startQuad].x + startModX : treeStart[startQuad].x - startModX : treeStart[startQuad].x;
        let startY = startQuad % 2 !== 0 ? Math.random() > .5 ? treeStart[startQuad].y + startModX : treeStart[startQuad].y - startModX : treeStart[startQuad].y;
        let length = Math.random() * (svgWidth / 2) + 20;
        let endPoint = calculateEndpoint(treeStart[startQuad], length, angle, "bottom")
        return [startX, startY, endPoint.x, endPoint.y, angle];
    }

    function getLength() {
        let branchStep = Math.random() > .2 ? 25 : 100;
        return (Math.round(Math.random() * branchStep) + 15) * lengthModifier
    }

    function generateLightColors() {
        if (lineColor !== "random") return lineColor;
        // Hue can vary across the full range (0-360)
        let hue = Math.floor(Math.random() * 361);
        // Saturation is kept high to ensure rich colors
        let saturation = 70 + Math.floor(Math.random() * 31); // 70% to 100%
        // Lightness is kept low for dark colors
        let lightness = 40 + Math.floor(Math.random() * 60); // 10% to 30%

        return (`hsl(${hue}, ${saturation}%, ${lightness}%)`);
}

    const internalIntervalRef = useRef();

    const getStrokeWidth = () => {
        if (lineWidth !== "random") return lineWidth;
        return Math.floor(Math.random() * 4) + 1
    }

    const [lineData, setLineData] = useState([])
    const svgRef = useRef(null)
    useEffect(() => {
        const externalIntervalID = setInterval(() => {
            let ngl = [];
            for (let i = 0; i < 100; i++) {
                ngl = generateLines();
                if (ngl.length > 10) break;
            }
            let newlineData = ngl.map((item, index) => {
                return <line key={`line-${Math.random()}x${index}${item[0]}`} x1={item[0]} y1={item[1]} x2={item[2]} y2={item[3]} stroke={generateLightColors()} strokeWidth={getStrokeWidth()} id={`myLine${index}`}/>
            });
            let intervalLength = 5000 / ngl.length;
            let count = 1;

            // Clear existing internal interval before setting a new one
            if (internalIntervalRef.current) clearInterval(internalIntervalRef.current);

            internalIntervalRef.current = setInterval(() => {
                setLineData(newlineData.slice(0, count));
                count++;
                if (count > ngl.length) {
                    clearInterval(internalIntervalRef.current);
                }
            }, intervalLength);

        }, 5000);
    

        return () => {
            // Clear both intervals when the component unmounts or effect re-runs
            clearInterval(externalIntervalID);
            if (internalIntervalRef.current) {
                clearInterval(internalIntervalRef.current);
            }
        };
    }, []); // Add any dependencies if needed
  return (
    <div>
    <div ref={svgRef}className="svg-container" >
        <svg transform = "scale(.3)" id="svg-canvas" className="svg-elem" style={{zIndex: 10}} width={svgWidth} height={svgWidth} xmlns="http://www.w3.org/2000/svg">
            {lineData}
        </svg>
      </div>
    </div>
  )
}

export default HeaderAnim
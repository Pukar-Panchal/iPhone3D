import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import ModelView from "./ModelView"
import { useRef, useState } from "react"
import { yellowImg } from "../utils/index"
import { animationWithGsap } from "../utils/animation"
import * as THREE from 'three'
import { Canvas } from "@react-three/fiber"
import { View } from "@react-three/drei"
import { models } from "../constants/index"
import { sizes } from "../constants/index"
import { useEffect } from "react"

const Model = () => {
    const [size, setSize] = useState('small')
    const [model, setModel] = useState({
        title: 'iphone 15 pro max in natural Titanium',
        color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
        img: yellowImg
    })
    // Camera control for the model view
    const cameraControlSmall = useRef();
    const cameraControlLarge = useRef();

    // model
    const small = useRef(new THREE.Group())
    const large = useRef(new THREE.Group())

    // rotaion
    const [smallRotation, setSmallRotation] = useState(0);
    const [largeRotation, setLargeRotation] = useState(0)

    const tl = useRef(gsap.timeline());

    useEffect(() => {
        const timeline = tl.current
        if (size === 'large') {
            animationWithGsap(timeline, small, smallRotation, "#view1", "#view2", {
                xPercent: -100,
                duration: 2
            })
        }
        if (size === 'small') {
            animationWithGsap(timeline, large, largeRotation, "#view2", "#view1", {
                xPercent: 0,
                duration: 2
            })
        }

    }, [size])

    useGSAP(() => {
        gsap.to('#heading', {
            y: -20,
            opacity: 1,
            duration: 1
        })
    })
    return (
        <section className="common-padding">
            <div className="screen-max-width">
                <h1 id="heading" className="section-heading">
                    take a closer look
                </h1>
                <div className="flex flex-col items-center mt-5">
                    <div className="w-full h-[75vh] md:h-[80vh] overflow-hidden relative">
                        <ModelView
                            index={1}
                            groupRef={small}
                            gsapType="view1"
                            controlRef={cameraControlSmall}
                            setRotationState={setSmallRotation}
                            item={model}
                            size={size}
                        />

                        <ModelView
                            index={2}
                            groupRef={large}
                            gsapType="view2"
                            controlRef={cameraControlLarge}
                            setRotationState={setLargeRotation}
                            item={model}
                            size={size}
                        />

                        <Canvas className="h-full w-full"
                            style={{
                                position: "fixed",
                                bottom: 0,
                                top: 0,
                                left: 0,
                                right: 0,
                                overflow: "hidden"
                            }}
                            eventSource={typeof document !== "undefined" ? document.getElementById("root") : null}
                        >
                            <View.Port  />
                        </Canvas>
                    </div>

                    <div className="mx-auto w-full">
                        <p className="text-sm font-light text-center">
                            {model.title}
                        </p>

                        <div className="flex-center mt-4">
                            <ul className="color-container">
                                {models.map((items, i) => (
                                    <li
                                        key={i}
                                        className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                                        style={{ backgroundColor: items.color[0] }}
                                        onClick={() => setModel(items)}>
                                    </li>
                                ))}
                            </ul>
                            <button className="size-btn-container">
                                {sizes.map(({ label, value }) => (
                                    <span
                                        className="size-btn"
                                        key={label}
                                        style={{ backgroundColor: size == value ? "white" : "transparent", color: size == value ? "black" : "white" }}
                                        onClick={() => setSize(value)}
                                    >
                                        {label}
                                    </span>
                                ))}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Model
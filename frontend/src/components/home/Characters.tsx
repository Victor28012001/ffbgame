import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useFBX, OrbitControls } from "@react-three/drei";
import { Text } from "../atom/Text";
import * as THREE from "three";
// import { degToRad } from "three/src/math/MathUtils";

const Characters = () => {
  // GLB model and FBX animations
  const items = useMemo(
    () => [
      {
        model: "/models/mawgo.glb",
        title: "Aeris Stormblade",
        description: "Wind-wielding warrior from the Sky Kingdom.",
        animations: {
          idle: "/animations/idle.fbx",
          welcome: "/animations/welcome.fbx",
          offering: "/animations/offering.fbx",
        },
        features: {
          hairColor: "Red",
          bodyType: "Curvy",
          abilities: ["Fireball", "Flame Shield", "Phoenix Summon"],
          accessories: ["Fire gem amulet", "Flame-touched bracers"],
          backstory:
            "Born with the power of flames, she seeks to control her abilities and protect her kingdom.",
        },
      },
      {
        model: "/models/char1.glb",
        title: "Zoltan Hammerfist",
        description: "A brute force fighter skilled in hand-to-hand combat.",
        animations: {
          idle: "/animations/idle.fbx",
          welcome: "/animations/welcome.fbx",
          offering: "/animations/offering.fbx",
        },
        features: {
          hairColor: "Red",
          bodyType: "Curvy",
          abilities: ["Fireball", "Flame Shield", "Phoenix Summon"],
          accessories: ["Fire gem amulet", "Flame-touched bracers"],
          backstory:
            "Born with the power of flames, she seeks to control her abilities and protect her kingdom.",
        },
      },
      {
        model: "/models/desert_sci-fi_game_character.glb",
        title: "Zara Flameheart",
        description:
          "A mage born with the power of fire, controlling flames with her fiery magic.",
        features: {
          hairColor: "Red",
          bodyType: "Curvy",
          abilities: ["Fireball", "Flame Shield", "Phoenix Summon"],
          accessories: ["Fire gem amulet", "Flame-touched bracers"],
          backstory:
            "Born with the power of flames, she seeks to control her abilities and protect her kingdom.",
        },
        animations: {
          idle: "/animations/idle.fbx",
          welcome: "/animations/welcome.fbx",
          offering: "/animations/offering.fbx",
        },
      },
    ],
    []
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState("idle"); // Default to 'idle' animation

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  return (
    <section className="w-full h-auto">
      <main className="w-full py-12 px-6 flex flex-col md:grid md:grid-cols-2 gap-4">
        {/* Text content */}
        <div className="w-full flex flex-col items-center md:items-start gap-3">
          <Text
            as="h4"
            className="uppercase font-semibold text-center md:text-left text-sm text-myGreen"
          >
            POWERFUL CHARACTERS
          </Text>
          <Text
            as="h1"
            className="lg:text-5xl text-center md:text-left font-extrabold tracking-[1px] text-2xl font-barlow"
          >
            OUR CHARACTERS, READY FOR BATTLE
          </Text>
          <div className="w-20 h-1.5 mt-3 bg-myGreen"></div>

          {/* Dynamic content */}
          <section className="w-full mt-20">
            <div className="flex flex-col items-center md:items-start gap-5 w-full">
              {/* <Text
                as="h3"
                className="text-gray-100 font-medium text-xl font-belanosima"
              >
                {items[currentSlide].title}
              </Text>
              <Text
                as="p"
                className="text-gray-300 font-barlow text-lg text-center md:text-left"
              >
                {items[currentSlide].description}
              </Text> */}
              <section className="w-full mt-20">
                <div className="flex flex-col items-center md:items-start gap-5 w-full">
                  <Text
                    as="h3"
                    className="text-gray-100 font-medium text-xl font-belanosima"
                  >
                    {items[currentSlide].title}
                  </Text>
                  <Text
                    as="p"
                    className="text-gray-300 font-barlow text-lg text-center md:text-left"
                  >
                    {items[currentSlide].description}
                  </Text>
                  <div className="text-gray-300 text-md font-barlow">
                    <p>
                      <strong>Hair Color:</strong>{" "}
                      {items[currentSlide].features.hairColor}
                    </p>
                    <p>
                      <strong>Body Type:</strong>{" "}
                      {items[currentSlide].features.bodyType}
                    </p>
                    <p>
                      <strong>Abilities:</strong>{" "}
                      {items[currentSlide].features.abilities.join(", ")}
                    </p>
                    <p>
                      <strong>Accessories:</strong>{" "}
                      {items[currentSlide].features.accessories.join(", ")}
                    </p>
                    <p>
                      <strong>Backstory:</strong>{" "}
                      {items[currentSlide].features.backstory}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>

        {/* Canvas with prev/next buttons on top */}
        <aside className="w-full h-[70vh] relative hidden md:block">
          <Canvas className="w-full h-full">
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 5, 5]} intensity={1} />
            {/* Render 3D model based on the current slide */}
            <Model
              path={items[currentSlide].model}
              animations={items[currentSlide].animations}
              currentAnimation={currentAnimation}
            />
          </Canvas>

          {/* Previous button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            <IoChevronBack size={30} />
          </button>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            <IoChevronForward size={30} />
          </button>

          {/* Animation control buttons */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <button
              onClick={() => setCurrentAnimation("welcome")}
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              Welcome
            </button>
            <button
              onClick={() => setCurrentAnimation("offering")}
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              Offering
            </button>
            <button
              onClick={() => setCurrentAnimation("idle")}
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              Idle
            </button>
          </div>
        </aside>
      </main>

      {/* For smaller screens */}
      <aside className="w-full h-[400px] block md:hidden relative">
        <Canvas className="w-full h-full">
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 5, 5]} intensity={1} />
          {/* Render 3D model based on the current slide */}
          <Model
            path={items[currentSlide].model}
            animations={items[currentSlide].animations}
            currentAnimation={currentAnimation}
          />
        </Canvas>
      </aside>
    </section>
  );
};

export default Characters;

interface ModelProps {
  path: string;
  animations: { [key: string]: string }; // A dictionary for animations, with string keys and values
  currentAnimation: string; // The current animation to play
}

// Model component to load the GLB model and apply FBX animations
function Model({ path, animations, currentAnimation }: ModelProps) {
  const gltf = useGLTF(path) as any; // Load the GLB model (typed as 'any' due to drei's type limitations)
  const fbx = useFBX(animations[currentAnimation]); // Load the current FBX animation

  const mixer = useMemo(() => new THREE.AnimationMixer(gltf.scene), [gltf]);

  useEffect(() => {
    if (fbx.animations.length) {
      const action = mixer.clipAction(fbx.animations[0]); // Apply the FBX animation to the model
      action.play();

      return () => {
        mixer.stopAllAction(); // Stop the current animation when component unmounts or animation changes
      };
    }
  }, [mixer, fbx]);

  useFrame((_state, delta) => {
    mixer.update(delta); // Update the animation mixer on each frame
  });

  return (
    <>
      {" "}
      <primitive
        object={gltf.scene}
        scale={2}
        position-y={1}
        // rotation-y={degToRad(360)}
        // rotation-z={degToRad(360)}
      />
      ;
      <OrbitControls />
    </>
  );
}

// Preload models and animations
useGLTF.preload("/models/avatar.glb");
useGLTF.preload("/models/mawgo.glb");
useFBX.preload("/animations/welcome.fbx");
useFBX.preload("/animations/idle.fbx");
useFBX.preload("/animations/offering.fbx");

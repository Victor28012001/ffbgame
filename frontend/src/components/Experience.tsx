import { PerspectiveCamera, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useLayoutEffect, useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Vector3, Color, Group, MeshStandardMaterial } from "three";
import { usePlay } from "../contexts/Play";
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";
import { Background } from "./Background";
import { Cloud } from "./Cloud";
import { Speed } from "./Speed";
import { TextSection } from "./TextSection";
import { ModelSection } from "./ModelSection";
import "./style.css";
import { useNavigate } from "react-router-dom";
// import points from './path.json'

const bloomColor = new Color("#fff");
bloomColor.multiplyScalar(1.5);

const LINE_NB_POINTS = 1000;
const CURVE_DISTANCE = 80;
const CURVE_AHEAD_CAMERA = 0.008;
const FRICTION_DISTANCE = 42;

export const Experience = () => {
  const navigate = useNavigate(); // Initialize navigation hook
  const curvePoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -2 * CURVE_DISTANCE),
      new THREE.Vector3(-100, 0, -3 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -4 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -5 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -6 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -7 * CURVE_DISTANCE),
    ],
    []
  );

  const sceneOpacity = useRef(0);
  const lineMaterialRef = useRef<MeshStandardMaterial | null>(null);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(curvePoints, false, "catmullrom", 0.5);
  }, []);

  const textSections = useMemo(() => {
    return [
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[1].x,
          curvePoints[1].y,
          curvePoints[1].z
        ),
        title: "Welcome to FFBGame",
        subtitle: `
At Fantasy Football Blockchain, we are redefining the fantasy sports experience by harnessing the power of blockchain technology. Our mission is to bring airness, transparency, and excitement to fantasy football enthusiasts around the world.`,
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[2].x,
          curvePoints[2].y,
          curvePoints[2].z
        ),
        title: "Our Team",
        subtitle: `We are a diverse team of sports enthusiasts, blockchain experts, and software developers dedicated to delivering the best fantasy football experience possible. Our team is committed to continuous improvement and innovation, ensuring that our platform remains at the forefront of the industry.`,
      },
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[3].x,
          curvePoints[3].y,
          curvePoints[3].z
        ),
        title: "Our Vision",
        subtitle: `Our vision is to revolutionize the fantasy sports industry by making it more engaging and accessible to everyone. We aim to create a vibrant community of fantasy football enthusiasts who can enjoy the game without concerns about fairness or security. By continually innovating and improving our platform, we strive to set new standards in the fantasy sports world.`,
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[4].x,
          curvePoints[4].y,
          curvePoints[4].z
        ),
        title: "Mini Leagues",
        subtitle: `We use smart contracts on the
blockchain to allow you to
create a mini league with
friends with monetary stakes.
Just set the parameters at the
start of the season (e.g. winner
takes all, or 50% to 1st place,
30% to 2nd place 20% to 3rd
etc. However you decide!) Once
the season is over the smart
contract will be triggered and
payouts directly made to your
Solana wallet.`,
      },
      {
        cameraRailDist: -1.5,
        position: new Vector3(
          curvePoints[5].x,
          curvePoints[5].y,
          curvePoints[5].z
        ),
        title: "Head to Head",
        subtitle: `You can also have one-on-one
head to head battles with your
friends, or anyone willing to
take you on on the platform.
Set your stake i.e. £20
challenge and whoever score
more points that gameweek
takes the winnings.`,
      },
      {
        cameraRailDist: -1.5,
        position: new Vector3(
          curvePoints[6].x,
          curvePoints[6].y,
          curvePoints[6].z
        ),
        title: "Enter FFBGame",
        subtitle: `Choose between the blue and the red pill`,
      },
    ];
  }, []);

  const charSections = useMemo(() => {
    return [
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[1].x - 2,
          curvePoints[1].y - 2,
          curvePoints[1].z
        ),
        title: "desert_sci-fi_game_character1.glb",
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[2].x - 2,
          curvePoints[2].y - 2,
          curvePoints[2].z
        ),
        title: "ancient_fighter2.glb",
      },
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[3].x - 2,
          curvePoints[3].y - 2,
          curvePoints[3].z
        ),
        title: "minecraft_skin_short-circuit_astrocreeper.glb",
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[4].x - 2,
          curvePoints[4].y - 2,
          curvePoints[4].z
        ),
        title: "hollow_knight4.glb",
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[5].x - 2,
          curvePoints[5].y - 2,
          curvePoints[5].z
        ),
        title: "meldvortDoormail1.glb",
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[6].x - 2,
          curvePoints[6].y - 2,
          curvePoints[6].z
        ),
        title: "meldvortDoormail2.glb",
      },
    ];
  }, []);

  const clouds = useMemo(
    () => [
      {},

      // FINAL
      // {
      //   scale: new Vector3(3, 3, 3),
      //   position: new Vector3(
      //     curvePoints[7].x + 12,
      //     curvePoints[7].y - 5,
      //     curvePoints[7].z + 60
      //   ),
      //   rotation: new Euler(-Math.PI / 4, -Math.PI / 6, 0),
      // },
      // {
      //   scale: new Vector3(3, 3, 3),
      //   position: new Vector3(
      //     curvePoints[7].x - 12,
      //     curvePoints[7].y + 5,
      //     curvePoints[7].z + 120
      //   ),
      //   rotation: new Euler(Math.PI / 4, Math.PI / 6, 0),
      // },
    ],
    []
  );

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.08);
    shape.lineTo(0, 0.08);

    return shape;
  }, [curve]);

  const cameraRail = useRef<Group | null>(null); // Initialize with null
  const cameraGroup = useRef<THREE.Group | null>(null);
  const camera = useRef<THREE.PerspectiveCamera | null>(null);
  const scroll = useScroll();
  const lastScroll = useRef(0);
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );
  const [reachedLastSection, setReachedLastSection] = useState(false);

  const { play, setHasScroll, end } = usePlay();

  const updateCameraView = () => {
    if (camera.current) {
      if (window.innerWidth > window.innerHeight) {
        // LANDSCAPE
        camera.current.fov = 30;
        camera.current.position.z = 5;
      } else {
        // PORTRAIT
        camera.current.fov = 80;
        camera.current.position.z = 2;
      }
      camera.current.updateProjectionMatrix();
    }
  };

  useEffect(() => {
    // Set up initial camera view
    updateCameraView();

    // Add event listener for window resize
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
      console.log(isPortrait)
      updateCameraView();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to check if the last section is reached
  const checkIfLastSectionReached = (scrollOffset: number) => {
    if (scrollOffset >= 1 && !reachedLastSection) {
      setReachedLastSection(true);
      navigate("/home"); // Change this to your desired path
    }
  };

  useFrame((_state, delta) => {
    if (camera.current) {
      // Add null check here
      updateCameraView();
    }

    if (lastScroll.current <= 0 && scroll.offset > 0) {
      setHasScroll(true);
    }

    if (play && !end && sceneOpacity.current < 1) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        1,
        delta * 0.1
      );
    }

    if (end && sceneOpacity.current > 0) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        0,
        delta
      );
    }

    if (lineMaterialRef.current) {
      // Add null check here
      lineMaterialRef.current.opacity = sceneOpacity.current; // Now safe to access
    }

    if (end) {
      return;
    }

    const scrollOffset = Math.max(0, scroll.offset);
    checkIfLastSectionReached(scrollOffset); // Check if we've reached the last section

    let friction = 1;
    let resetCameraRail = true;
    // LOOK TO CLOSE TEXT SECTIONS
    textSections.forEach(
      (textSection: {
        position: { distanceTo: (arg0: any) => any };
        cameraRailDist: number;
      }) => {
        // Check if cameraGroup.current is defined
        const cameraGroupPosition = cameraGroup.current?.position;

        if (cameraGroupPosition) {
          // Only proceed if the position is defined
          const distance = textSection.position.distanceTo(cameraGroupPosition);

          if (distance < FRICTION_DISTANCE) {
            friction = Math.max(distance / FRICTION_DISTANCE, 0.1);
            const targetCameraRailPosition = new Vector3(
              (1 - distance / FRICTION_DISTANCE) * textSection.cameraRailDist,
              0,
              0
            );

            if (cameraRail.current) {
              // Check if current is not null
              cameraRail.current.position.lerp(targetCameraRailPosition, delta);
              resetCameraRail = false;
            }
          }
        }
      }
    );

    if (resetCameraRail) {
      const targetCameraRailPosition = new Vector3(0, 0, 0);
      if (cameraRail.current) {
        // Check if current is not null
        cameraRail.current.position.lerp(targetCameraRailPosition, delta);
      }
    }

    // CALCULATE LERPED SCROLL OFFSET
    let lerpedScrollOffset = THREE.MathUtils.lerp(
      lastScroll.current,
      scrollOffset,
      delta * friction
    );
    // PROTECT BELOW 0 AND ABOVE 1
    lerpedScrollOffset = Math.min(lerpedScrollOffset, 1);
    lerpedScrollOffset = Math.max(lerpedScrollOffset, 0);

    if (cameraGroup.current) {
      // Check if cameraGroup.current is defined
      lastScroll.current = lerpedScrollOffset; // Assuming lastScroll is defined
      tl.current?.seek(
        lerpedScrollOffset * (tl.current.duration ? tl.current.duration() : 0)
      ); // Safely access duration

      const curPoint = curve.getPoint(lerpedScrollOffset); // Ensure curve is defined

      // Follow the curve points
      cameraGroup.current.position.lerp(curPoint, delta * 24);

      // Make the group look ahead on the curve
      const lookAtPoint = curve.getPoint(
        Math.min(lerpedScrollOffset + CURVE_AHEAD_CAMERA, 1)
      );

      const currentLookAt = cameraGroup.current.getWorldDirection(
        new THREE.Vector3()
      );
      const targetLookAt = new THREE.Vector3()
        .subVectors(curPoint, lookAtPoint)
        .normalize();

      // Calculate the lookAt direction
      const lookAt = currentLookAt.lerp(targetLookAt, delta * 24);

      // Set the camera to look at the calculated point
      cameraGroup.current.lookAt(
        cameraGroup.current.position.clone().add(lookAt)
      );
    }
  });

  const tl = useRef<ReturnType<typeof gsap.timeline> | null>(null);
  const backgroundColors = useRef({
    colorA: "#3535cc",
    colorB: "#abaadd",
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    // tl.current.to(backgroundColors.current, {
    //   duration: 1,
    //   colorA: "#6f35cc",
    //   colorB: "#ffad30",
    // });
    // tl.current.to(backgroundColors.current, {
    //   duration: 1,
    //   colorA: "#424242",
    //   colorB: "#ffcc00",
    // });
    // tl.current.to(backgroundColors.current, {
    //   duration: 1,
    //   colorA: "#81318b",
    //   colorB: "#55ab8f",
    // });

    tl.current.pause();
  }, []);

  // useEffect(() => {
  //   if (play) {
  //     planeInTl.current.play();
  //   }
  // }, [play]);

  return useMemo(
    () => (
      <>
        <directionalLight position={[0, 3, 1]} intensity={0.1} />

        <group ref={cameraGroup}>
          <Speed />
          <Background backgroundColors={backgroundColors} />
          <group ref={cameraRail}>
            <PerspectiveCamera
              ref={camera}
              position={[0, 0, 5]}
              fov={30}
              makeDefault
            />
          </group>
        </group>
        {/* TEXT */}
        {textSections.map((textSection, index) => (
          <TextSection {...textSection} key={index} />
        ))}

        {/* TEXT */}
        {charSections.map((textSection, index) => (
          <ModelSection {...textSection} key={index} />
        ))}

        {/* LINE */}
        <group position-y={-2}>
          <mesh>
            <extrudeGeometry
              args={[
                shape,
                {
                  steps: LINE_NB_POINTS,
                  bevelEnabled: false,
                  extrudePath: curve,
                },
              ]}
            />
            <meshStandardMaterial
              color={"white"}
              ref={lineMaterialRef}
              transparent={true}
              opacity={0}
              envMapIntensity={2}
              onBeforeCompile={fadeOnBeforeCompile}
            />
          </mesh>
        </group>

        {/* CLOUDS */}
        {clouds.map((cloud, index) => (
          <Cloud sceneOpacity={sceneOpacity} {...cloud} key={index} />
        ))}
      </>
    ),
    []
  );
};

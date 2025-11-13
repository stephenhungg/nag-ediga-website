import { useEffect, useRef, useState } from 'react';
import Masonry from './Masonry';
import ProjectModal from './ProjectModal';
import { FloatingCircle, FloatingLine, GearFragment, DiagonalDivider } from './AbstractElements';
import AnimatedGrid from './AnimatedGrid';

interface Project {
  id: string;
  title: string;
  description: string;
  img: string;
  images?: string[]; // Multiple images for gallery
  url: string;
  height: number;
  category: string;
  technologies: string[];
  longDescription: string;
  specifications?: {
    [key: string]: string;
  };
  process?: {
    step: string;
    description: string;
    image?: string;
  }[];
  links?: {
    label: string;
    url: string;
    icon?: 'github' | 'link' | 'download' | 'demo';
  }[];
}

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const projects: Project[] = [
    {
      id: '1',
      title: 'Bias Lighting PCB',
      description: 'ESP32-P4-based LED backlight PCB with real-time color matching via camera analysis',
      img: '/images/IMG_7839.jpg',
      images: [
        '/images/IMG_7839.jpg',
        '/images/IMG_0211.jpg',
      ],
      url: '#',
      height: 400,
      category: 'PCB Design',
      technologies: ['KiCad', 'ESP32-P4', 'PCB Design', 'DFMA', 'Electrical Engineering'],
      longDescription: 'A work-in-progress project where we\'re developing an ESP32-P4-based LED backlight PCB that uses a camera to analyze on-screen colors and adjust the ambient lighting to match in real time. The PCB incorporates microcontrollers, resistors, capacitors, fuse protectors, step-down converters, diodes, and other electrical components. The design has been optimized for Design for Manufacturing & Assembly (DFMA) to reduce cost and make fabrication and assembly straightforward. Current and voltage requirements were calculated to properly size trace widths and select copper thickness for safe power delivery. The project is currently in PCB fabrication with parts sourcing and assembly next.',
      specifications: {
        'Microcontroller': 'ESP32-P4',
        'Power Input': '5V via USB Type-C',
        'Protection': 'Fuse-protected power rails',
        'Voltage Regulation': 'Step-down converters for multiple voltage rails',
        'Status': 'In PCB fabrication',
        'Team': 'Alden Brion, Jason Park, Nag Ediga',
        'Date': 'November 2025',
      },
      process: [
        {
          step: 'Schematic Design',
          description: 'Designed the complete schematic in KiCad, incorporating ESP32-P4 microcontroller, power management (step-down converters, fuses), protection circuits (diodes), and peripheral components (resistors, capacitors). Ensured proper power distribution and signal integrity throughout the design.',
        },
        {
          step: 'PCB Layout & Routing',
          description: 'Created optimized PCB layout with careful component placement for thermal management and signal integrity. Routed power traces with appropriate widths based on current calculations. Implemented proper ground planes and via placement for multi-layer routing.',
        },
        {
          step: 'DFMA Optimization',
          description: 'Optimized the PCB for Design for Manufacturing & Assembly to reduce fabrication costs and simplify assembly. Standardized component sizes where possible, ensured adequate spacing for pick-and-place machines, and verified all design rules for manufacturability.',
        },
        {
          step: 'Power Analysis',
          description: 'Calculated current and voltage requirements for all subsystems. Sized trace widths appropriately based on current carrying capacity and selected appropriate copper thickness. Verified power delivery paths can safely handle maximum load conditions.',
        },
        {
          step: 'Fabrication & Assembly',
          description: 'Currently in PCB fabrication phase. Next steps include parts sourcing, component procurement, and assembly. More results coming soon.',
        },
      ],
      links: [],
    },
    {
      id: '2',
      title: 'Campanile PCB',
      description: 'Custom PCB shaped like the iconic UC Berkeley Campanile',
      img: '/images/IMG_9115.jpg',
      images: [
        '/images/IMG_9115.jpg',
      ],
      url: '#',
      height: 300,
      category: 'PCB Assembly',
      technologies: ['PCB Assembly', 'Soldering', 'Electronics', 'Through-Hole Components'],
      longDescription: 'A fun side project where I assembled a custom PCB shaped like the iconic UC Berkeley Campanile. I assembled and soldered through-hole LEDs and other components onto the Campanile-shaped PCB. This project taught me how to use flux properly to keep connections clean and avoid bridging. I practiced steady soldering techniques for small parts and learned how to troubleshoot minor shorts and connectivity issues. Successfully completed the board with all LEDs functioning as intended.',
      specifications: {
        'Type': 'Custom shaped PCB',
        'Components': 'Through-hole LEDs, resistors, connectors',
        'Status': 'Completed - All LEDs functioning',
        'Course': 'Hands-On PCB Engineering DeCal',
      },
      process: [
        {
          step: 'Component Assembly',
          description: 'Assembled through-hole LEDs and other components onto the Campanile-shaped PCB, carefully placing each component in its designated location.',
        },
        {
          step: 'Flux Application',
          description: 'Learned how to use flux properly to keep connections clean and avoid bridging between adjacent pads. Proper flux application is crucial for clean solder joints.',
        },
        {
          step: 'Soldering',
          description: 'Practiced steady soldering techniques for small parts, ensuring each connection was secure and properly formed. Focused on maintaining consistent temperature and timing.',
        },
        {
          step: 'Troubleshooting',
          description: 'Learned how to troubleshoot minor shorts and connectivity issues. Used multimeter testing and visual inspection to identify and fix problems.',
        },
        {
          step: 'Testing & Completion',
          description: 'Tested all connections and verified that all LEDs were functioning as intended. Successfully completed the board with full functionality.',
        },
      ],
      links: [],
    },
    {
      id: '3',
      title: 'Headphone Desk Mount',
      description: 'Workspace organization solution combining cable management and headphone storage',
      img: '/images/Overviewpic.png',
      images: [
        '/images/Overviewpic.png',
        '/images/headphone-mount-how-built.png',
      ],
      url: '#',
      height: 500,
      category: 'Design',
      technologies: ['SolidWorks', 'Ansys FEA', 'GD&T', 'DFM', '3D Printing'],
      longDescription: 'A fun personal project I designed to declutter my workspace by combining cable management and headphone storage. The casing holds my extension cord, while a side mount provides a dedicated place to hang my headphones. A threaded clamping screw allows it to securely attach to desks of varying thicknesses. Designed to be simple, compact, and easy for anyone to use. I modeled the entire assembly in SolidWorks, using GD&T to precisely define tolerances for the threaded clamping screw and mated parts. Used Ansys FEA to simulate real-world loading scenarios, accounting for the combined weight of my headphones and extension cord. Applied Design for Manufacturing (DFM) principles to reduce material usage and cut the projected cost without compromising strength. Achieved a Factor of Safety (FoS) of 8.3, confirming that the design can handle daily use. The mount securely supports both the headphones and the extension cord without any noticeable deflection. Cut the projected cost from $13 to around $6 without compromising strength.',
      specifications: {
        'Factor of Safety': '8.3',
        'Cost Reduction': '$13 → $6 (54% reduction)',
        'Mounting': 'Threaded clamping screw for variable desk thickness',
        'Functionality': 'Cable management + headphone storage',
        'Status': 'Completed',
      },
      process: [
        {
          step: 'CAD Modeling',
          description: 'Modeled the entire assembly in SolidWorks, using GD&T (Geometric Dimensioning and Tolerancing) to precisely define tolerances for the threaded clamping screw and mated parts. Ensured proper fit and function of all components.',
        },
        {
          step: 'FEA Analysis',
          description: 'Used Ansys FEA to simulate real-world loading scenarios, accounting for the combined weight of headphones and extension cord. Analyzed stress distribution and deflection to ensure structural integrity.',
        },
        {
          step: 'DFM Optimization',
          description: 'Applied Design for Manufacturing (DFM) principles to reduce material usage and cut projected cost without compromising strength. Optimized geometry to minimize waste while maintaining performance.',
        },
        {
          step: 'Validation',
          description: 'Achieved a Factor of Safety (FoS) of 8.3, confirming that the design can handle daily use. Verified that the mount securely supports both headphones and extension cord without any noticeable deflection.',
        },
      ],
      links: [],
    },
    {
      id: '4',
      title: 'Helping Hand',
      description: 'Assistive rehabilitation device to help kids with single-arm impairments regain wrist and finger movement',
      img: '/images/IMG_2479.jpg',
      images: [
        '/images/IMG_2479.jpg',
        '/images/Otherchildren.jpg',
        '/images/testing-helping-hand.png',
        '/images/graphofHHresults.png',
      ],
      url: '#',
      height: 400,
      category: 'Medical Device',
      technologies: ['CAD', 'R&D Testing', 'Force Sensors', 'Motion Tracking', 'Agile Methodology', 'Prototyping'],
      longDescription: 'We created an assistive rehabilitation device to help kids with single-arm impairments regain wrist and finger movement. The design focused on comfort, usability, and consistent recovery through an iterative, user-centered process. We built and tested several prototypes, improving the design each time based on real feedback from users and therapists. I modeled the adjustable rings, arm brace, and Boa ratchet dial mount in CAD. Led the R&D testing process, collecting data from force sensors, motion tracking, and grip-strength tests to see how well the device worked and felt for users. Ran fatigue and load tests on the brace to understand weak points, then adjusted materials and geometry for better durability. Used Agile methods throughout the process, which made it easier for the team to iterate quickly and stay organized. Compared performance before and after each major prototype to track progress and confirm improvements. Met 6 out of 8 design goals, hitting all the major ones and missing only a few minor specs. Both kids who tested the device, Leland and Kylie, genuinely loved using it and were excited to keep it as part of their therapy routine.',
      specifications: {
        'Design Goals Met': '6 out of 8 (all major goals achieved)',
        'Users Tested': '2 children (Leland and Kylie)',
        'User Feedback': 'Positive - users loved using it and wanted to keep it',
        'Focus Areas': 'Comfort, usability, consistent recovery',
        'Methodology': 'Agile, iterative, user-centered design',
      },
      process: [
        {
          step: 'CAD Design',
          description: 'Modeled the adjustable rings, arm brace, and Boa ratchet dial mount in CAD. Designed for comfort, adjustability, and ease of use.',
        },
        {
          step: 'R&D Testing',
          description: 'Led the R&D testing process, collecting data from force sensors, motion tracking, and grip-strength tests to evaluate device performance and user experience.',
        },
        {
          step: 'Durability Testing',
          description: 'Ran fatigue and load tests on the brace to identify weak points. Adjusted materials and geometry based on test results to improve durability and reliability.',
        },
        {
          step: 'Iterative Prototyping',
          description: 'Built and tested several prototypes using Agile methodology. Compared performance before and after each major prototype to track progress and confirm improvements. Incorporated feedback from users and therapists.',
        },
        {
          step: 'User Testing & Validation',
          description: 'Tested the device with two children (Leland and Kylie) who have single-arm impairments. Both users loved using it and were excited to keep it as part of their therapy routine. Met 6 out of 8 design goals.',
        },
      ],
      links: [],
    },
    {
      id: '5',
      title: 'Miniature Wind Turbine',
      description: 'Optimized wind turbine design using CFD and FEA analysis with experimental validation',
      img: '/images/WindTurbine.png',
      images: [
        '/images/WindTurbine.png',
        '/images/windturbineirl.png',
        '/images/Windturbine_CFD.png',
        '/images/windturbineFEA.png',
        '/images/IMG_8184.JPG',
        '/images/wind-turbine-test-1.jpg',
        '/images/wind-turbine-test-2.jpg',
      ],
      url: '#',
      height: 450,
      category: 'Aerodynamics',
      technologies: ['SolidWorks CFD', 'FEA', 'Simulated Annealing', 'Experimental Testing', '3D Printing'],
      longDescription: 'Designed and optimized a miniature wind turbine using computational fluid dynamics (CFD) and finite element analysis (FEA) to maximize torque output and structural integrity. Used SolidWorks CFD with simulated annealing optimization techniques to iteratively refine blade geometry and achieve the highest possible torque. Analyzed pressure distribution across blade surfaces, identifying optimal blade count and angle configurations. Performed FEA analysis to evaluate stress, strain, displacement, and factor of safety under operational loads. The analysis revealed pressure variations indicating blade count optimization opportunities. Designed a tripod-mounted structure with two-bladed propeller configuration, optimized for aerodynamic efficiency. Built and tested physical prototypes, measuring torque output, structural deflection, and performance characteristics using dial indicators and force measurement equipment. Achieved a minimum factor of safety of 87 under 8 Newtons of load, demonstrating excellent structural robustness. The iterative design process combined computational optimization with experimental validation to create an efficient, lightweight wind turbine design.',
      specifications: {
        'Blade Configuration': 'Two-bladed propeller',
        'Mounting': 'Tripod base structure',
        'Factor of Safety': 'Minimum 87 under 8N load',
        'Optimization Method': 'Simulated annealing with CFD',
        'Analysis': 'CFD (pressure, flow) and FEA (stress, strain, displacement)',
        'Status': 'Designed, analyzed, and tested',
      },
      process: [
        {
          step: 'CFD Optimization',
          description: 'Used SolidWorks CFD with simulated annealing optimization to iteratively refine blade geometry and maximize torque output. Analyzed pressure distribution across blade surfaces, identifying that high and low pressure on the same side of blades indicated optimal blade count relative to available air pressure.',
        },
        {
          step: 'Aerodynamic Design',
          description: 'Designed two-bladed propeller with aerodynamic twist optimized for energy capture. Analyzed fluid flow patterns, streamlines, and velocity distributions to understand how the blades interact with airflow and generate torque.',
        },
        {
          step: 'FEA Structural Analysis',
          description: 'Performed finite element analysis to evaluate stress (von Mises), strain, displacement, and factor of safety under operational loads. Analyzed the tripod structure and blade mounting points to ensure structural integrity.',
        },
        {
          step: 'Prototype Fabrication',
          description: 'Fabricated physical prototypes using 3D printing and assembled the tripod-mounted wind turbine structure. Ensured proper alignment and mounting of all components.',
        },
        {
          step: 'Experimental Testing',
          description: 'Conducted experimental testing using dial indicators, force gauges, and measurement equipment. Measured torque output, structural deflection, and performance characteristics. Validated computational predictions with real-world measurements.',
        },
        {
          step: 'Validation & Results',
          description: 'Validated design achieving a minimum factor of safety of 87 under 8 Newtons of load. Confirmed that the optimized blade configuration performed as predicted by CFD analysis, demonstrating the effectiveness of the computational optimization approach.',
        },
      ],
      links: [],
    },
    {
      id: '6',
      title: 'Unmanned Surface Vehicle',
      description: 'Autonomous surface vehicle for oceanographic data collection from lakes',
      img: '/images/IMG_9552.jpg',
      images: [
        '/images/IMG_9552.jpg',
        '/images/IMG_9556.jpg',
        '/images/IMG_9867.jpg',
        '/images/IMG_9869.jpg',
        '/images/waypointmission.png',
        '/images/Componentsinbox.jpg',
        '/images/learning-soldering.jpg',
      ],
      url: '#',
      height: 400,
      category: 'Robotics',
      technologies: ['ArduPilot', 'SketchUp', 'Embedded Systems', 'Soldering', 'GPS', 'Telemetry', 'Autonomous Navigation'],
      longDescription: 'Collaborated with UC San Diego to develop an autonomous surface vehicle (USV) which gathers oceanographic data from lakes. Created an autonomous movement system to operate a boat while towing a buoy to gather environmental data like pH, temperature, etc. Worked as part of a multidisciplinary team with Electrical, Mechanical & Software Engineers to develop an embedded system to improve ocean health through automated data collection. Used SketchUp to model mounts for the electrical components. Developed an autonomous navigation system (via ArduPilot) to give the boat a waypoint-based movement system for missions. Soldered and wired these components: brushless motors, telemetry radios, GPS, and a receiver to the flight controller. Developed a system capable of autonomous navigation through various water conditions, including changing currents and surface disturbances. Built an airtight and durable housing to protect electronics while keeping all components securely mounted and accessible for maintenance. Created an embedded system between Electrical Components, Mechanical components, and software for proper communication between all subsystems.',
      specifications: {
        'Collaboration': 'UC San Diego',
        'Purpose': 'Oceanographic data collection (pH, temperature, etc.)',
        'Navigation': 'Waypoint-based autonomous system via ArduPilot',
        'Components': 'Brushless motors, telemetry radios, GPS, receiver, flight controller',
        'Capabilities': 'Autonomous navigation in varying water conditions',
        'Housing': 'Airtight and durable with accessible maintenance',
      },
      process: [
        {
          step: 'CAD Design',
          description: 'Used SketchUp to model mounts for the electrical components, ensuring proper fit and secure mounting within the housing.',
        },
        {
          step: 'Autonomous Navigation Development',
          description: 'Developed an autonomous navigation system via ArduPilot to give the boat a waypoint-based movement system for missions. Configured GPS and waypoint planning for precise navigation.',
        },
        {
          step: 'Electronics Assembly',
          description: 'Soldered and wired components including brushless motors, telemetry radios, GPS, and a receiver to the flight controller. Ensured proper connections and signal integrity.',
        },
        {
          step: 'Housing Design & Build',
          description: 'Built an airtight and durable housing to protect electronics while keeping all components securely mounted and accessible for maintenance. Designed for water resistance and durability.',
        },
        {
          step: 'System Integration',
          description: 'Created an embedded system between Electrical Components, Mechanical components, and software for proper communication between all subsystems. Ensured seamless integration across disciplines.',
        },
        {
          step: 'Testing & Validation',
          description: 'Tested the system in various water conditions, including changing currents and surface disturbances. Validated autonomous navigation capabilities and data collection functionality.',
        },
      ],
      links: [],
    },
    {
      id: '7',
      title: 'USB Charger PCB',
      description: 'Portable USB power bank PCB with boost converter for battery-to-USB charging',
      img: '/images/IMG_9117.jpg',
      images: [
        '/images/IMG_9117.jpg',
        '/images/USBcharger_3dmodel.png',
        '/images/USBcharger_layout.png',
        '/images/USBcharger_Schematic.png',
      ],
      url: '#',
      height: 400,
      category: 'PCB Design',
      technologies: ['KiCad', 'PCB Design', 'Power Electronics', 'Boost Converter', 'USB-C', 'USB-A'],
      longDescription: 'Designed and developed a portable USB charger PCB that converts low-voltage battery input (1.0-5.5V) to a stable 5V output for charging devices via USB-C and USB-A ports. The design uses a TPS61023DRLR boost converter IC to efficiently step up the battery voltage. Created the complete schematic in KiCad, incorporating input protection with Schottky diodes and fuses, proper filtering capacitors, and voltage feedback networks. Designed the PCB layout with careful attention to power routing, ground planes, and component placement for optimal thermal management. The board features multiple input options (battery header and USB Micro-B) and dual outputs (USB-C and USB-A) with proper USB-C configuration for power delivery. Includes a 5V indicator LED and proper USB 2.0 data passthrough. Successfully prototyped and tested the board, achieving stable 5V output at 1.5A capacity with good efficiency across the input voltage range.',
      specifications: {
        'Input Voltage': '1.0-5.5V (battery) or USB Micro-B',
        'Output Voltage': '5V regulated',
        'Output Current': '1.5A maximum',
        'Output Ports': 'USB-C and USB-A',
        'IC': 'TPS61023DRLR boost converter',
        'Protection': 'Fuse and Schottky diode input protection',
        'Status': 'Prototyped and tested',
      },
      process: [
        {
          step: 'Schematic Design',
          description: 'Created the complete schematic in KiCad using TPS61023DRLR boost converter IC. Designed input protection with fuses and Schottky diodes, voltage feedback network, and proper filtering. Incorporated multiple input options and dual USB outputs with proper USB-C configuration.',
        },
        {
          step: 'Component Selection',
          description: 'Selected appropriate inductor (WE-MAIA_4020), capacitors for filtering, and current-limiting resistors. Ensured all components met power and voltage requirements for the boost converter circuit.',
        },
        {
          step: 'PCB Layout',
          description: 'Designed PCB layout with careful power routing and ground plane placement. Optimized component placement for thermal management and signal integrity. Ensured proper trace widths for current carrying capacity.',
        },
        {
          step: '3D Modeling & Validation',
          description: 'Created 3D model to verify component clearances and connector placement. Validated mechanical fit and ensured all connectors were properly positioned for usability.',
        },
        {
          step: 'Prototyping & Testing',
          description: 'Fabricated prototype PCB and assembled components. Tested output voltage regulation, current capacity, and efficiency across the input voltage range. Verified USB-C power delivery configuration and USB-A functionality.',
        },
      ],
      links: [],
    },
    
    {
      id: '8',
      title: 'Vending Machine',
      description: 'Modular acrylic vending machine with compartmentalized storage and automated dispensing system',
      img: '/images/IMG_2413.JPG',
      images: [
        '/images/IMG_2413.JPG',
        '/images/IMG_9630.JPG',
        '/images/IMG_2397.JPG',
      ],
      url: '#',
      height: 400,
      category: 'Mechanical Design',
      technologies: ['CAD', 'Acrylic Fabrication', 'Mechanical Assembly', 'Modular Design', 'Fastening Systems'],
      longDescription: 'Designed and built a modular vending machine system using clear acrylic panels and black divider compartments. Created a grid-based storage system with multiple compartments arranged in rows and columns for organized product dispensing. Designed the structure with transparent acrylic walls for visibility and black opaque dividers to create distinct storage compartments. Used metal brackets and fasteners to securely join the acrylic panels, ensuring structural integrity while maintaining a clean, modular appearance. The design allows for easy assembly and disassembly, making it adaptable for different product sizes and configurations. Fabricated the acrylic panels using laser cutting or CNC routing, ensuring precise dimensions and clean edges. Assembled the structure with careful attention to alignment and fastener placement. The modular design enables customization of compartment sizes and layouts based on product requirements. Successfully created a functional prototype that demonstrates the principles of modular design, material selection, and mechanical assembly.',
      specifications: {
        'Material': 'Clear acrylic panels with black opaque dividers',
        'Structure': 'Modular grid-based compartment system',
        'Fastening': 'Metal brackets and screws',
        'Visibility': 'Transparent walls for product viewing',
        'Modularity': 'Customizable compartment sizes and layouts',
        'Status': 'Prototype completed',
      },
      process: [
        {
          step: 'Design & CAD Modeling',
          description: 'Designed the modular structure in CAD, creating a grid-based layout with multiple compartments. Determined optimal compartment sizes and panel dimensions. Designed bracket and fastener locations for secure assembly.',
        },
        {
          step: 'Material Selection',
          description: 'Selected clear acrylic for main panels to provide visibility and black opaque material for dividers to create distinct compartments. Chose appropriate thickness for structural integrity while maintaining transparency.',
        },
        {
          step: 'Fabrication',
          description: 'Fabricated acrylic panels using laser cutting or CNC routing to achieve precise dimensions and clean edges. Cut divider panels to create the grid structure. Prepared all components for assembly.',
        },
        {
          step: 'Assembly',
          description: 'Assembled the structure using metal brackets and screws to join acrylic panels. Carefully aligned dividers to create uniform compartments. Ensured proper fastening and structural stability throughout the assembly process.',
        },
        {
          step: 'Testing & Validation',
          description: 'Tested the modular system with various product sizes to validate compartment functionality. Verified structural integrity and ease of assembly/disassembly. Confirmed the design meets requirements for modularity and adaptability.',
        },
      ],
      links: [],
    },
    {
      id: '9',
      title: 'Wheel Center',
      description: 'Lightweight, high-performance wheel center for Berkeley Formula Racing car',
      img: '/images/WheelCenterpic_1.png',
      images: [
        '/images/WheelCenterpic_1.png',
        '/images/WheelCenterpic_2.png',
        '/images/WheelCenterDrawing.png',
        '/images/WheelCenter_StressPlot.png',
        '/images/WheelCenter_FOS.png',
        '/images/WheelCenter_displacement.png',
      ],
      url: '#',
      height: 400,
      category: 'FEA Analysis',
      technologies: ['SolidWorks', 'Ansys FEA', 'DFM', 'Material Selection', 'Structural Optimization'],
      longDescription: 'Designed a lightweight, high-performance wheel center for the Berkeley Formula Racing car. Focused on optimizing stiffness, strength, and manufacturability while keeping weight and cost low. Created over six design iterations in SolidWorks, refining geometry and spoke structure with each version. Calculated maximum load cases from suspension data and applied them in Ansys FEA to evaluate stress, displacement, and failure modes. Researched the relationship between spoke count, spoke angle, and performance to find an optimal layout for our use case. Selected the material based on key mechanical properties including modulus of elasticity, yield strength, and Poisson\'s ratio. Applied Design for Manufacturing principles to simplify machining and balance the tradeoff between weight, factor of safety, and stiffness. Achieved a factor of safety of 1.5, displacement of 0.51 mm, and a final weight of 0.37 lbs. Estimated total manufacturing cost was around $34.',
      specifications: {
        'Factor of Safety': '1.5',
        'Maximum Displacement': '0.51 mm',
        'Weight': '0.37 lbs',
        'Manufacturing Cost': '$34',
        'Design Iterations': '6+ versions',
        'Application': 'Berkeley Formula Racing car',
      },
      process: [
        {
          step: 'Design Iteration',
          description: 'Created over six design iterations in SolidWorks, refining geometry and spoke structure with each version. Researched the relationship between spoke count, spoke angle, and performance to find an optimal layout for our use case.',
        },
        {
          step: 'Load Case Analysis',
          description: 'Calculated maximum load cases from suspension data to understand the forces the wheel center would experience during operation. Used this data to inform FEA simulations.',
        },
        {
          step: 'FEA Simulation',
          description: 'Applied load cases in Ansys FEA to evaluate stress distribution, displacement, and failure modes. Analyzed von Mises stress, factor of safety, and displacement to ensure structural integrity.',
        },
        {
          step: 'Material Selection',
          description: 'Selected the material based on key mechanical properties including modulus of elasticity, yield strength, and Poisson\'s ratio. Balanced material properties with cost and manufacturability.',
        },
        {
          step: 'DFM Optimization',
          description: 'Applied Design for Manufacturing principles to simplify machining and balance the tradeoff between weight, factor of safety, and stiffness. Optimized geometry for manufacturability while maintaining performance.',
        },
        {
          step: 'Final Validation',
          description: 'Validated the final design achieving a factor of safety of 1.5, displacement of 0.51 mm, and a final weight of 0.37 lbs. Estimated total manufacturing cost at around $34.',
        },
      ],
      links: [],
    },
  ];

  const filteredProjects = projects;

  const masonryItems = filteredProjects.map(project => ({
    id: project.id,
    img: project.img,
    url: '#',
    height: project.height,
    title: project.title,
    description: project.description,
    longDescription: project.longDescription,
  }));

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-24 overflow-hidden abstract-pattern"
    >
      {/* Animated Grid Background */}
      <AnimatedGrid opacity={0.08} color="#003262" size={60} />
      
      {/* Abstract Background Elements */}
      <FloatingCircle 
        size={450} 
        position={{ top: '-5%', right: '5%' }} 
        rotation={60}
        opacity={0.07}
        color="#003262"
      />
      <FloatingLine 
        length={700} 
        position={{ top: '20%', left: '-8%' }} 
        rotation={-30}
        opacity={0.1}
        color="#003262"
      />
      <GearFragment 
        size={140} 
        position={{ top: '10%', left: '5%' }} 
        rotation={-15}
        opacity={0.06}
        color="#003262"
      />
      <GearFragment 
        size={90} 
        position={{ bottom: '20%', right: '10%' }} 
        rotation={40}
        opacity={0.05}
        color="#FDB515"
      />

      {/* Diagonal Divider at top */}
      <div className="absolute top-0 left-0 right-0 z-0">
        <DiagonalDivider direction="left" color="#003262" opacity={0.15} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Overlapping Header */}
        <div className="relative mb-20">
          {/* Oversized decorative number behind */}
          <div className="absolute -left-8 -top-8 lg:-left-16 lg:-top-12 text-[250px] lg:text-[350px] font-serif italic text-berkeley-blue/5 leading-none select-none z-0">
            03
          </div>
          
          {/* Header content overlapping */}
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-gray-900 mb-6 tracking-tight relative">
              <span className="italic">Projects</span>
              {/* Rotated decorative text */}
              <span 
                className="absolute -right-8 top-1/2 -translate-y-1/2 text-2xl lg:text-3xl font-serif italic text-berkeley-blue/8 select-none hidden lg:block"
                style={{ transform: 'translateY(-50%) rotate(90deg)', transformOrigin: 'center' }}
              >
                PORTFOLIO
              </span>
            </h2>
            
            <div className="w-20 h-1.5 bg-berkeley-blue mb-8 rounded-full"></div>
          </div>
        </div>

        {/* Masonry Grid */}
        {isVisible && (
          <div className="relative z-10">
            <Masonry
              items={masonryItems}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={0.95}
              blurToFocus={true}
              colorShiftOnHover={false}
              expandedProject={expandedProject}
              onProjectClick={(id) => {
                setExpandedProject(expandedProject === id ? null : id);
                const project = filteredProjects.find(p => p.id === id);
                if (project) setSelectedProject(project);
              }}
            />
          </div>
        )}
      </div>

      {/* Diagonal Divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <DiagonalDivider direction="right" color="#003262" opacity={0.15} />
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;





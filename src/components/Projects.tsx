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
      description: 'PCB design for bias lighting',
      img: 'https://picsum.photos/id/1015/600/900?grayscale',
      images: [
        'https://picsum.photos/id/1015/600/900?grayscale',
        'https://picsum.photos/id/1018/600/900?grayscale',
        'https://picsum.photos/id/1019/600/900?grayscale',
        'https://picsum.photos/id/1026/600/900?grayscale',
      ],
      url: '#',
      height: 400,
      category: 'CAD',
      technologies: ['SolidWorks', 'Arduino', 'Servo Control', 'Python', '3D Printing'],
      longDescription: 'A comprehensive mechanical design project focusing on precision robotics. This multi-axis arm features servo-controlled joints, custom 3D-printed components, and integrated electronics for accurate positioning and movement control. The project demonstrates advanced CAD modeling, kinematic analysis, control systems integration, and iterative prototyping to achieve sub-millimeter precision.',
      specifications: {
        'Degrees of Freedom': '6-axis articulation',
        'Reach': '850mm maximum extension',
        'Payload Capacity': '2.5 kg at full extension',
        'Repeatability': '±0.1mm positioning accuracy',
        'Construction': 'Aluminum frame with ABS joints',
        'Power Supply': '12V DC, 5A peak current',
        'Control System': 'Arduino Mega 2560 with custom shield',
        'Communication': 'USB serial and Bluetooth wireless',
      },
      process: [
        {
          step: 'Kinematic Analysis',
          description: 'Performed forward and inverse kinematic calculations using Denavit-Hartenberg parameters. Developed MATLAB scripts to validate workspace envelope and identify singularities in the design.',
        },
        {
          step: 'CAD Modeling',
          description: 'Created detailed 3D models in SolidWorks with full assembly constraints. Designed custom servo mounts, gear trains, and cable management systems. Performed interference checking and tolerance analysis.',
        },
        {
          step: 'FEA Structural Analysis',
          description: 'Conducted finite element analysis on critical load-bearing components. Optimized arm link geometry to balance strength and weight, achieving 3:1 safety factor under maximum payload conditions.',
        },
        {
          step: 'Prototype & Testing',
          description: 'Fabricated components using FDM 3D printing and CNC machining. Assembled prototype with integrated servo motors and position feedback sensors. Conducted repeatability tests and calibrated control algorithms.',
        },
      ],
      links: [
        {
          label: 'View on GitHub',
          url: '#',
          icon: 'github',
        },
        {
          label: 'Technical Report',
          url: '#',
          icon: 'download',
        },
        {
          label: 'Video Demo',
          url: '#',
          icon: 'demo',
        },
      ],
    },
    {
      id: '2',
      title: 'Campanile PCB',
      description: 'PCB design for campanile',
      img: 'https://picsum.photos/id/1011/600/750?grayscale',
      images: [
        'https://picsum.photos/id/1011/600/750?grayscale',
        'https://picsum.photos/id/1016/600/750?grayscale',
        'https://picsum.photos/id/1024/600/750?grayscale',
      ],
      url: '#',
      height: 300,
      category: 'Analysis',
      technologies: ['ANSYS', 'MATLAB', 'CFD', 'SolidWorks', 'Thermodynamics'],
      longDescription: 'An innovative thermal engineering solution addressing heat transfer efficiency in industrial cooling applications. This project showcases advanced computational fluid dynamics analysis, material selection for optimal thermal properties, and structural analysis under thermal stress. Through iterative simulation and experimental validation, achieved a 34% improvement in heat transfer coefficient while reducing pressure drop by 18%.',
      specifications: {
        'Type': 'Shell-and-tube counter-flow',
        'Heat Transfer Rate': '125 kW nominal capacity',
        'Effectiveness': '0.87 (NTU method)',
        'Operating Temperature': '-10°C to 150°C range',
        'Pressure Rating': '10 bar maximum working pressure',
        'Materials': 'Copper tubes, stainless steel shell',
        'Dimensions': '1200mm length × 300mm diameter',
        'Weight': '85 kg dry weight',
      },
      process: [
        {
          step: 'Baseline Analysis',
          description: 'Characterized existing heat exchanger performance through experimental testing. Measured temperature profiles, pressure drops, and flow rates under various operating conditions to establish baseline metrics.',
        },
        {
          step: 'CFD Modeling',
          description: 'Developed high-fidelity CFD models in ANSYS Fluent with conjugate heat transfer. Validated simulation results against experimental data with less than 5% deviation. Identified flow recirculation zones and thermal hotspots.',
        },
        {
          step: 'Parametric Optimization',
          description: 'Conducted parametric studies varying tube pitch, baffle spacing, and flow rates. Used design of experiments (DOE) approach to identify optimal configuration. Evaluated trade-offs between heat transfer enhancement and pressure drop penalties.',
        },
        {
          step: 'Prototype Validation',
          description: 'Fabricated optimized design and conducted performance testing. Measured 34% improvement in overall heat transfer coefficient. Verified structural integrity under thermal cycling and pressure testing.',
        },
      ],
      links: [
        {
          label: 'Analysis Report',
          url: '#',
          icon: 'download',
        },
        {
          label: 'Simulation Files',
          url: '#',
          icon: 'link',
        },
      ],
    },
    {
      id: '3',
      title: 'Headphones Desk Mount',
      description: 'Design and 3D print of a desk mount for headphones',
      img: 'https://picsum.photos/id/1020/600/800?grayscale',
      url: '#',
      height: 500,
      category: 'Design',
      technologies: ['CATIA', 'FEA', 'Kinematic Analysis'],
      longDescription: 'A collaborative design project highlighting advanced suspension geometry. This project involved kinematic analysis, FEA stress testing, and optimization for ride comfort and handling performance across multiple driving conditions.',
    },
    {
      id: '4',
      title: 'Helping Hand',
      description: 'Aerodynamic analysis of blade profiles',
      img: 'https://picsum.photos/id/1025/600/700?grayscale',
      url: '#',
      height: 350,
      category: 'Analysis',
      technologies: ['ANSYS Fluent', 'Python', 'Data Analysis'],
      longDescription: 'A research-based project exploring renewable energy optimization. This work demonstrates computational fluid dynamics, aerodynamic profiling, structural analysis under wind loading, and data-driven design iteration.',
    },
    {
      id: '5',
      title: 'Miniature Wind Turbine',
      description: 'Design and 3D print of a miniature wind turbine',
      img: 'https://picsum.photos/id/1035/600/850?grayscale',
      url: '#',
      height: 450,
      category: 'Manufacturing',
      technologies: ['PLC Programming', 'Pneumatics', 'Sensors'],
      longDescription: 'A practical application of manufacturing engineering principles. This project showcases pneumatic system design, sensor integration, PLC programming for automated control, and real-world industrial problem-solving.',
    },
    {
      id: '6',
      title: 'Unmanned Surface Vehicle',
      description: 'Design and 3D print of a unmanned surface vehicle',
      img: 'https://picsum.photos/id/1039/600/600?grayscale',
      url: '#',
      height: 300,
      category: 'CAD',
      technologies: ['SolidWorks', 'FEA', 'Material Selection'],
      longDescription: 'An advanced design project incorporating topology optimization. This work highlights finite element analysis, material selection for strength-to-weight ratio, and modern CAD techniques for efficient structural design.',
    },
    {
      id: '7',
      title: 'USB Charger PCB',
      description: 'PCB design for a USB charger',
      img: 'https://picsum.photos/id/1043/600/900?grayscale',
      url: '#',
      height: 400,
      category: 'Design',
      technologies: ['Thermodynamics', 'Ductwork Design', 'Energy Analysis'],
      longDescription: 'A mechanical engineering project showcasing HVAC design principles. Includes psychrometric analysis, ductwork sizing, equipment selection, and energy efficiency optimization for commercial building applications.',
    },
    {
      id: '8',
      title: 'Vending Machine',
      description: 'Design and 3D print of a vending machine',
      img: 'https://picsum.photos/id/1047/600/750?grayscale',
      url: '#',
      height: 350,
      category: 'Design',
      technologies: ['Mechanical Design', 'Stress Analysis', 'Lubrication'],
      longDescription: 'An engineering project demonstrating advanced power transmission design. Features gear ratio optimization, tooth profile analysis, bearing selection, and lubrication system design for high-efficiency torque transfer.',
    },
    {
      id: '9',
      title: 'Wheel Center',
      description: 'Design and 3D print of a wheel center',
      img: 'https://picsum.photos/id/1047/600/750?grayscale',
      url: '#',
      height: 350,
      category: 'Design',
      technologies: ['Mechanical Design', 'Stress Analysis', 'Lubrication'],
      longDescription: 'An engineering project demonstrating advanced power transmission design. Features gear ratio optimization, tooth profile analysis, bearing selection, and lubrication system design for high-efficiency torque transfer.',
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

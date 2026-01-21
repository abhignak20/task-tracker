export default function Graph({ tasks, dependencies }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="mt-6 p-4 border rounded">
        <h2 className="font-bold mb-2">Task Graph</h2>
        <p>No tasks to visualize</p>
      </div>
    );
  }

  // simple layout
  const nodeRadius = 25;
  const width = 500;
  const height = 120 + tasks.length * 70;

  const positions = {};
  tasks.forEach((task, index) => {
    positions[task.id] = {
      x: 80 + (index % 4) * 120,
      y: 60 + Math.floor(index / 4) * 100,
    };
  });

  return (
    <div className="mt-8 border p-4 rounded">
      <h2 className="font-bold mb-4">Task Dependency Graph</h2>

      <svg width={width} height={height}>
        {/* ARROWS */}
        <defs>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            refX="10"
            refY="5"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 Z" fill="black" />
          </marker>
        </defs>

        {/* DEPENDENCY LINES */}
        {dependencies.map((dep, i) => {
          const from = positions[dep.depends_on];
          const to = positions[dep.task];
          if (!from || !to) return null;

          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="black"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
          );
        })}

        {/* TASK NODES */}
        {tasks.map((task) => {
          const pos = positions[task.id];
          return (
            <g key={task.id}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={nodeRadius}
                fill="#60a5fa"
              />
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fill="white"
              >
                {task.title}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

const fs = require('fs');
let content = fs.readFileSync('src/pages/Landing.jsx', 'utf8');

// Color replacements
content = content.replace(/\[#101010\]/g, 'brand-black');
content = content.replace(/\[#202020\]/g, 'brand-charcoal');
content = content.replace(/\[#F5F4F0\]/g, 'brand-offwhite');
content = content.replace(/\[#F05AC8\]/g, 'brand-pink');
content = content.replace(/\[#20B889\]/g, 'brand-emerald');
content = content.replace(/\[#4146DF\]/g, 'brand-periwinkle');
content = content.replace(/\[#DCD8F6\]/g, 'brand-lavender');
content = content.replace(/\[#858585\]/g, 'gray-500');

// Fix Hero Layout (remove strict heights and fixed positions that overlap)
content = content.replace(
  '<div className="mt-20 relative w-full max-w-5xl h-[400px] md:h-[500px]">',
  '<div className="mt-20 relative w-full max-w-5xl flex flex-col items-center pb-20">'
);
content = content.replace(
  'className="absolute top-10 left-1/2 -translate-x-1/2 w-[90%] md:w-[800px] bg-white rounded-2xl shadow-2xl p-6 border border-brand-charcoal/10"',
  'className="w-[90%] md:w-[800px] bg-white rounded-2xl shadow-2xl p-6 border border-brand-charcoal/10 relative z-10"'
);
content = content.replace(
  'className="absolute bottom-10 left-[5%] md:left-[10%] bg-white border border-brand-charcoal/10 p-4 rounded-xl shadow-xl"',
  'className="hidden md:block absolute -bottom-10 left-[5%] md:left-[10%] bg-white border border-brand-charcoal/10 p-4 rounded-xl shadow-xl z-20"'
);
content = content.replace(
  'className="absolute top-0 right-[5%] md:right-[10%] bg-brand-black text-white p-4 rounded-xl shadow-xl flex items-center gap-3"',
  'className="hidden md:flex absolute top-0 right-[5%] md:right-[10%] bg-brand-black text-white p-4 rounded-xl shadow-xl items-center gap-3 z-20"'
);

// Problem Section Collage Fix
content = content.replace(
  'className="absolute bottom-10 left-20 w-80 bg-white p-6 rounded-xl shadow-2xl"',
  'className="absolute -bottom-10 md:bottom-10 left-0 md:left-20 w-80 bg-white p-6 rounded-xl shadow-2xl"'
);

// Workflow Overview Fix
content = content.replace(
  'className="hidden md:block absolute top-[28px] left-[50px] right-[50px] h-1 bg-brand-lavender z-0"',
  'className="hidden md:block absolute top-[28px] left-[50px] right-[50px] h-1 bg-brand-lavender z-0 overflow-hidden rounded-full"'
);

// Fix overlapping navbar text issue (padding)
content = content.replace(
  'className="relative pt-40 pb-20 md:pt-48 md:pb-32 bg-brand-offwhite overflow-hidden min-h-screen flex flex-col items-center"',
  'className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-brand-offwhite overflow-hidden min-h-screen flex flex-col items-center"'
);

// Remove specific colors object since we use tailwind theme now
content = content.replace(/const colors = {[\s\S]*?};\n/, '');

fs.writeFileSync('src/pages/Landing.jsx', content);
console.log('Fixed Landing.jsx layout and colors');

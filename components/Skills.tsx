import { getSkillCategories } from '@/actions/skills.actions';

import { getPhosphorIcon } from '@/lib/icons';

const Skills = async () => {
  const skillCategories = await getSkillCategories();

  return (
    <>
      {skillCategories.map((category, index) => {
        const Icon = getPhosphorIcon[category.icon];

        return (
          <div
            key={index}
            className="border border-b-2 border-(--text-muted) bg-(--bg-alt) rounded-2xl grid grid-rows-subgrid row-span-3 gap-4 p-4 justify-items-center"
          >
            <Icon className="text-4xl text-(--text-muted) mt-1.5" />

            <h3 className="text-lg font-medium text-center line-clamp-2">{category.title}</h3>

            <div className="flex flex-col gap-3 w-full overflow-hidden mt-1.5">
              {category.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="text-center px-4 py-3 rounded-lg bg-(--bg) text-(--text-muted) truncate border-b border-(--text-muted)"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Skills;

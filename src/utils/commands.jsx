import { 
    projects, 
    skills,
    contacts,
 } from './constants';

export default function Commands({input}){

    const normalizedInput = input.toLowerCase();
    return(
        <>
            {
                normalizedInput == "help" ?
                    <div className="flex flex-col w-full ps-3">
                        <div className="flex flex-col w-full gap-1">
                            <span className="font-extrabold text-white w-full block">whoami</span>
                            <span className="ms-10 w-full block">
                                - Shows you a brief summary about me.
                            </span>
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <span className="font-extrabold text-white w-full block">skills</span>
                            <span className="ms-10 w-full block">
                                - Shows you an overview with tech stack I am familiar with.
                            </span>
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <span className="font-extrabold text-white w-full block">contact</span>
                            <span className="ms-10 w-full block">
                                - Connect with me?
                            </span>
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <span className="font-extrabold text-white w-full block">projects</span>
                            <span className="ms-10 w-full block">
                                - See what I have made.
                            </span>
                        </div>
                        {/* <div className="flex flex-col w-full gap-1">
                            <span className="font-extrabold text-white w-full block">show-ui</span>
                            <span className="ms-10 w-full block">
                                - Disables the CLI and shows you the GUI.
                            </span>
                        </div> */}
                        <div className="flex flex-col w-full gap-1">
                            <span className="font-extrabold text-white w-full block">clear</span>
                            <span className="ms-10 w-full block">
                                - clears the terminal.
                            </span>
                        </div>
                    </div> 
                : 
                normalizedInput == 'whoami' ?
                    <div className="w-full ps-3">
                        <div>
                            I am a graduating student in Baliuag University, taking the program Bachelor of Science in information Technology
                        </div>
                        <div>
                            I am currently looking for an OJT preferrably opportunities that will help me improve my development career.
                        </div>
                    </div>
                :
                normalizedInput == "skills" ?
                    <div className="flex flex-col w-full ps-3">
                       {skills.map((section) => (
                        <div key={section.category} className="flex flex-col w-full ps-3">
                            <span className="font-bold text-white">{section.category}</span>
                            <ul className="flex flex-col w-full ps-7">
                            {section.items.map((item) => (
                                <li
                                key={item.name}
                                className={`list-disc ${item.proficient ? "font-bold text-white" : ""}`}
                                >
                                {item.name}
                                </li>
                            ))}
                            </ul>
                        </div>
                        ))}

                    </div>
                :
                normalizedInput == "contact" ?
                <div className="flex flex-col w-full">
                    {contacts.map((contact) => (
                        <div key={contact.label} className="flex flex-row gap-2 w-full">
                            <div className="font-bold text-white">{contact.label}</div>
                            <div>:</div>
                            {contact.type === "link" ? (
                            <a className="w-[60%] text-white underline" target="_blank" href={contact.href}>
                                {contact.value}
                            </a>
                            ) : (
                            <div className="w-[60%] text-white">{contact.value}</div>
                            )}
                        </div>
                    ))}

                </div>
                :
                normalizedInput == "projects" ?
                <div className="flex flex-col w-full">
                {projects.map((project, index) => (
                    <div key={index} className="flex flex-row gap-2 w-full">
                        <a 
                            className="font-bold text-white underline w-[15rem]" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            href={project.repolink}
                        >
                            {project.title}
                        </a>
                        <div>:</div>
                        <div className="w-[50%]">
                            {project.description}
                        </div>
                        <div className="w-[30%]">
                            {project.stack}
                        </div>
                    </div>
                ))}
            </div>
                :
                <div className="flex flex-row gap-2">
                    Command <span className="text-red-600">'{ input }'</span> not found. Type <span className="text-green-400 italic font-bold">'help'</span> to view available commands.
                </div>
            }
        </>
    );
}
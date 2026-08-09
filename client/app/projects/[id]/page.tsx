'use client';

import React, { use, useState } from 'react'
import ProjectHeader from '../ProjectHeader';
import Board from '../BoardView/page';

type Props = {
    params: Promise<{ id: string }>;
};

const Project = ({params}: Props) => {
    const { id } = use(params);
    const [activeTab, setActiveTab] = useState("Board");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
        {/* Modal new task */}
        <ProjectHeader activetab={activeTab} setActiveTab={setActiveTab} />
        { activeTab === "Board" && (
            <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
        )}
    </div>
  )
}

export default Project

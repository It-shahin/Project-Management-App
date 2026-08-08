'use client';

import React, { useState } from 'react'
import ProjectHeader from '../ProjectHeader';

type Props = {
    params: { id: string};
};

const Project = ({params}: Props) => {
    const { id } = params;
    const [activeTab, setActiveTab] = useState("Board");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
        {/* Modal new task */}
        <ProjectHeader activetab={activeTab} setActiveTab={setActiveTab} />
        {/* { activeTab === "Board" && (
            <Board />
        )} */}
    </div>
  )
}

export default Project
"use client";
import React from 'react';
import ChatInterface from '../../../components/shared/ChatInterface';
import { mockChat } from '../../../data/mockData';

export default function ProfessorAssistente() {
  return <ChatInterface role="professor" data={mockChat.professor} />;
}


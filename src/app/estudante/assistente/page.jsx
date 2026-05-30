"use client";
import React from 'react';
import ChatInterface from '../../../components/shared/ChatInterface';
import { mockChat } from '../../../data/mockData';

export default function AssistenteDeIA() {
  return <ChatInterface role="student" data={mockChat.student} />;
}


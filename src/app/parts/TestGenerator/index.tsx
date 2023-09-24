'use client';

import { Add, Close, Print, Remove } from "@mui/icons-material";
import { Input, Button, Chip } from "@nextui-org/react";

import React, { ChangeEvent, useState } from "react";
import type Question from "./Question";

const TestGenerator = () => {
  const [bookName, setBookName] = useState("");
  
  const [newMannualField, setNewMannualField] = useState("");
  const [mannualFields, setMannualFields] = useState<string[]>([]);

  const [questions, setQuestions] = useState<Question[]>([]);

  const [questionName, setQuestionName] = useState("");
  const [questionA, setQuestionA] = useState("");
  const [questionB, setQuestionB] = useState("");
  const [questionC, setQuestionC] = useState("");
  const [questionD, setQuestionD] = useState("");

  const addQuestion = () => {
    const newQuestionToAdd = {
      question: questionName,
      A: questionA,
      B: questionB,
      C: questionC,
      D: questionD
    } as Question;
    setQuestions(currQuestions => [...currQuestions, newQuestionToAdd]);

    setQuestionName("");
    setQuestionA("");
    setQuestionB("");
    setQuestionC("");
    setQuestionD("");
  };

  return <>
    <div className="container pt-8 mx-auto">
      <div className="print:hidden grid gap-4 lg:grid-cols-2">
        <div className="w-full">
          <h3 className="text-xl mb-4">Add Question</h3>
          <div id="newQuestion" className="grid gap-2">
            <Input type="text" onChange={(e) => setQuestionName(e.target.value)} value={questionName} name="question" label="Question title" />
            <Input type="text" onChange={(e) => setQuestionA(e.target.value)} value={questionA} name="A" placeholder='Answer "A"' />
            <Input type="text" onChange={(e) => setQuestionB(e.target.value)} value={questionB} name="B" placeholder='Answer "B"' />
            <Input type="text" onChange={(e) => setQuestionC(e.target.value)} value={questionC} name="C" placeholder='Answer "C"' />
            <Input type="text" onChange={(e) => setQuestionD(e.target.value)} value={questionD} name="D" placeholder='Answer "D"' />
          </div>
        </div>
        <div className="w-full">
          <h3 className="text-xl mb-4">Extra options</h3>
          <div className="grid gap-2">
            <Input
              label="Test name"
              placeholder="Ex. Math test"
              onChange={(e) => setBookName(e.target.value)} />

            <Input
              label="Fields to be mannualy filled"
              placeholder="Ex. Name, Age, Club, Region"
              value={newMannualField}
              style={{maxWidth: '10'}}
              onChange={e => setNewMannualField(e.target.value || '')}
              startContent={

                mannualFields.map(
                  field => (
                    <Chip
                      key={field}
                      color="primary"
                      style={{cursor: 'pointer'}}
                      endContent={<Close sx={{fontSize: '14px'}} />}
                      onClick={() => setMannualFields(mannualFields.filter(f => f !== field))}
                    >
                      {field}
                    </Chip>
                  )
                )
              }
              endContent={
                <Button
                  color="primary"
                  size="sm"
                  onClick={() => {
                    setMannualFields([...mannualFields, newMannualField]);
                    setNewMannualField("");
                  }}
                  isIconOnly>
                    <Add />
                </Button>
              }
            />

            <Button
              color="primary"
              type="submit"
              onClick={addQuestion}>
              Add Question<Add />
            </Button>
          </div>
        </div>
      </div>
      <span className="print:hidden block mt-8 mb-2 text-xs opacity-50">Pré visualização</span>
      <div className="
        relative
        px-10 py-8
        pt-20 pl-20
        text-black
        aspect-[210mm_297mm]
        bg-white
      ">
        <Button
          className="print:hidden absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
          radius="full"
          color="primary"
          onClick={() => window.print()}
        >
          <Print />
        </Button>
        <div className="w-full grid gap-1">
          <div className="w-full grid grid-cols-[2fr_1fr] gap-4">
            {mannualFields.map(field => (
              <div key={field}>
                <div>{field}: <div className="block border-b border-b-black"></div></div>
              </div>
            ))}
          </div>
        </div>
        <h1 className="font-bold text-5xl mt-16 mb-10">{bookName || 'Generated test'}</h1>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {
            questions.map((question, i) => {
              return (
                <div
                  key={`question${i}`}
                  className="relative"
                >
                  <Button
                    size="sm"
                    color="danger"
                    radius="full"
                    onClick={() => setQuestions(questions.filter(q => q !== question))}
                    className="
                      absolute top-0 right-0
                      flex w-6 h-6
                      min-w-0 p-0
                      -translate-x-1/2 -translate-y-1/2
                    "
                  >
                    <Remove sx={{fontSize: '12px'}} />
                  </Button>
                  <h5 className="font-bold">{++i}) {question['question']}</h5>
                  <ol>
                    <li>A) {question['A']}</li>
                    <li>B) {question['B']}</li>
                    <li>C) {question['C']}</li>
                    <li>D) {question['D']}</li>
                  </ol>
                </div>
              );
            })
          }
          <div
            key={`previewQuestion`}
            className="relative"
          >
            <h5 className="font-bold">{questions.length+1}) {questionName}</h5>
            <ol>
              <li>A) {questionA}</li>
              <li>B) {questionB}</li>
              <li>C) {questionC}</li>
              <li>D) {questionD}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </>;
}

export default TestGenerator;
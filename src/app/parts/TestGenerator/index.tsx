'use client';

import { Add, Close, KeyboardReturn, KeyboardReturnRounded, Print, Remove } from "@mui/icons-material";
import { Input, Button, Chip } from "@nextui-org/react";

import React, { useEffect, useRef, useState } from "react";
import type Question from "./Question";

const TestGenerator = () => {
  const [screenWidth, setScreenWidth] = useState(0);
  const printSheet = useRef<HTMLDivElement>(null);

  const [testName, setTestName] = useState("");
  
  const [newMannualField, setNewMannualField] = useState("");
  const [mannualFields, setMannualFields] = useState<string[]>(['Name']);

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

  const print = () => {
    const head = document.head.outerHTML;
    const printWindow = window.open('', '', 'height=1000,width=800')!;
    printWindow.document.write(`<html><head>${head}</head>`);
    printWindow.document.write(`<body>${printSheet.current?.innerHTML || ''}</body></html>`);
    printWindow.document.close();
    printWindow.print();
  }

  useEffect(() => {
    const resize = () => {
      setScreenWidth(Math.min(document.body.clientWidth, 1366));
      console.log((screenWidth/3579));
    };
    window.addEventListener('resize', resize);
    resize();
    
    return () => document.removeEventListener('resize', resize);
  }, []);

  return <>
    <div className="container w-full pt-8 px-4 mx-auto">
      <div className="grid gap-4 lg:grid-cols-2">
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
              onChange={(e) => setTestName(e.target.value)} />

            <Input
              label="Fields to be mannualy filled, separated by comma"
              placeholder="Ex. Name, Age, City"
              value={newMannualField}
              style={{maxWidth: '10'}}
              multiple={true}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ',') {
                  e.preventDefault();
                  setMannualFields([...mannualFields, newMannualField]);
                  setNewMannualField("");
                }else if (e.key === 'Backspace' && newMannualField === '') {
                  e.preventDefault();
                  setMannualFields(mannualFields.slice(0, -1));
                }
              }}
              endContent={<><small style={{display: 'flex'}}>Press <KeyboardReturnRounded /></small></>}
              onChange={e => setNewMannualField(e.target.value || '')}
            />
            <nav className="flex flex-wrap gap-2 mb-4">
              {mannualFields.map(
                field => (
                  <Chip
                    key={field}
                    color="primary"
                    style={{cursor: 'pointer'}}
                    size="sm"
                    endContent={<Close sx={{fontSize: '14px'}} />}
                    onClick={() => setMannualFields(mannualFields.filter(f => f !== field))}
                  >
                    {field}
                  </Chip>
                )
              )}
            </nav>

            <Button
              color="primary"
              type="submit"
              onClick={addQuestion}>
              Add Question<Add />
            </Button>
          </div>
        </div>
      </div>
      <span className="relative block mt-8 mb-2 text-xs text-white/50">
        Pre visualization

        <Button
            className="
              absolute
              top-full right-0
              max-lg:w-16 max-lg:h-16
              max-w-none max-h-none
              lg:translate-x-1/2 -translate-y-1/2
              z-[1]
            "
            size="lg"
            radius="full"
            color="primary"
            onClick={print}
          >
            <Print className="
              block
              max-w-none max-h-none
              w-16 h-16
              text-9xl lg:text-2xl" />
          </Button>
      </span>
      <div className="pre-visualization relative overflow-scroll w-full">
        <div
          ref={printSheet}
          className={`
            relative
            pb-8 pr-8
            pt-20 pl-20
            text-black
            bg-white
            w-[3579px]
          `}
        >
          <div className="w-full grid gap-1">
            <div className="w-full grid grid-cols-[2fr_1fr] gap-4">
              {mannualFields.map(field => (
                <div key={field}>
                  <div>{field}: <div className="block border-b border-b-black"></div></div>
                </div>
              ))}
            </div>
          </div>
          <h1 className="font-bold text-5xl mt-16 mb-10">{testName || 'Generated test'}</h1>
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
    </div>
  </>;
}

export default TestGenerator;
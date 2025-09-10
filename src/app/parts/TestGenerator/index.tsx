'use client';

import { Print, Remove } from "@mui/icons-material";
import { Button } from "@heroui/react";

import React, { useEffect, useRef, useState } from "react";
import type Question from "./Question";
import Controls from "./Controls";

const TestGenerator = () => {
  const printSheet = useRef<HTMLDivElement>(null);
  const [pageColumns, setPageColumns] = useState(3);

  const [zoomLevel, setZoomLevel] = useState(1);

  const [testName, setTestName] = useState("Novo Teste");

  const [newMannualField, setNewMannualField] = useState("");
  const [mannualFields, setMannualFields] = useState<string[]>(['Nome']);

  const [questions, setQuestions] = useState<Question[]>([]);

  const [questionName, setQuestionName] = useState("Enunciado da questão");
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
    printWindow.document.write(`<html><head>
        ${head}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>`);
    printWindow.document.write(`<body>${printSheet.current?.innerHTML || ''}</body></html>`);
    printWindow.document.close();
    printWindow.print();
  }

  const regularTextSize = { fontSize: 16 * (zoomLevel) };
  const titleTextSize = { fontSize: 48 * (zoomLevel) };

  return <>
    <div className="container w-full pt-8 px-4 mx-auto">
      <Controls
        pageColumns={pageColumns}
        setPageColumns={setPageColumns}
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
        testName={testName}
        setTestName={setTestName}
        newMannualField={newMannualField}
        setNewMannualField={setNewMannualField}
        mannualFields={mannualFields}
        setMannualFields={setMannualFields}
        questions={questions}
        setQuestions={setQuestions}
        questionName={questionName}
        setQuestionName={setQuestionName}
        questionA={questionA}
        questionB={questionB}
        questionC={questionC}
        questionD={questionD}
        setQuestionA={setQuestionA}
        setQuestionB={setQuestionB}
        setQuestionC={setQuestionC}
        setQuestionD={setQuestionD}
        addQuestion={addQuestion}
      />

      <span className="relative block mt-8 mb-2 text-xs text-white/50">
        Pré-visualização

        <Button
          className="
            absolute
            top-full right-0 lg:right-2/3
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

      <div className="pre-visualization relative overflow-auto w-full">
        <div
          ref={printSheet}
          className={`
            relative antialiased
            pb-8 pr-8
            pt-20 pl-20
            text-black
            bg-white
            w-[210mm]
          `}
        >
          <div className="w-full grid gap-1">
            <div className="w-full grid grid-cols-[2fr_1fr] gap-4">
              {mannualFields.map(field => (
                <div key={field}>
                  <div style={regularTextSize}>{field}: <div className="block border-b border-b-black"></div></div>
                </div>
              ))}
            </div>
          </div>

          <h1 style={titleTextSize} className="font-bold mt-16 mb-10">{testName}</h1>

          <div className="grid gap-4 mt-8" style={{ gridTemplateColumns: `repeat(${pageColumns}, 1fr)` }}>
            {questions.map((question, i) => (
              <div
                key={`question${i}`}
                className="relative"
              >
                <h3 style={regularTextSize} className="font-bold">{i + 1}) {question['question']}
                  <Button
                    size="sm"
                    color="danger"
                    radius="full"
                    onClick={() => setQuestions(questions.filter(q => q !== question))}
                    className="
                      print:hidden
                      inline-block h-6
                      min-w-0 py-0 ml-4
                    "
                  >
                    <Remove sx={{ fontSize: '12px' }} />
                  </Button>
                </h3>

                <ol>
                  <li style={regularTextSize}>A) {question['A']}</li>
                  <li style={regularTextSize}>B) {question['B']}</li>
                  <li style={regularTextSize}>C) {question['C']}</li>
                  <li style={regularTextSize}>D) {question['D']}</li>
                </ol>
              </div>
            ))}

            <div
              key={`previewQuestion`}
              className="relative"
            >
              <h5 style={regularTextSize} className="font-bold">{questions.length + 1}) {questionName}</h5>
              <ol>
                <li style={regularTextSize}>A) {questionA}</li>
                <li style={regularTextSize}>B) {questionB}</li>
                <li style={regularTextSize}>C) {questionC}</li>
                <li style={regularTextSize}>D) {questionD}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
}

export default TestGenerator;
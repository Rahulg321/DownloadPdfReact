import jsPdf from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

function App() {
  const pdfRef = useRef();

  const downloadPdf = () => {
    const input = pdfRef.current;
    console.log(input);

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/pnj");
        const pdf = new jsPdf("p", "mm", "a4", true);
        // pdf.setMargins(10, 10, 10, 10);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;
        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );

        pdf.save("rahulGupta.pdf");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div ref={pdfRef}>
        <h1>Hello world</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus
          laborum quae soluta molestias velit tenetur aut, error fugiat ab
          laudantium ipsam sunt exercitationem non aspernatur asperiores sed sit
          cupiditate iusto?
        </p>
        <h2>These are contents of the downloadable pdf</h2>
      </div>
      <button onClick={downloadPdf}>Download Pdf</button>
    </>
  );
}

export default App;

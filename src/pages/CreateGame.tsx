import "../assets/CreateGame/style.scss";

function CreateGame() {
  const handleDragOver = (event: any) => {
    event.preventDefault();
    console.log("Drag Over");
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    console.log(file);

    // 드롭된 파일 핸들링
    // ...
  };
  return (
    <>
      <label
        onDragEnter={() => console.log("Drag Enter")}
        onDragOver={handleDragOver}
        onDragLeave={() => console.log("Drag Leave")}
        onDrop={handleDrop}
      >
        <input type="file" className="myfile" accept="image/*" />
        <h3>드래그</h3>
      </label>
    </>
  );
}

export default CreateGame;

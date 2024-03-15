function ProgressBar({ completed }: { completed: number }) {
  const containerStyles = {
    height: 3,
    width: "100%",
    borderRadius: "1rem",
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: "var(--text)",
    borderRadius: "inherit",
  };

  const labelStyles = {
    padding: 5,
    color: "var(--white)",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}></span>
      </div>
    </div>
  );
}

export default ProgressBar;

export default validationAlert = (recipes) => {
  if (Object.keys(recipes).length === 0) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
};

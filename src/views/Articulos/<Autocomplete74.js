<Autocomplete
id="prove"
options={cliente}
name="prove"
freeSolo      
value={prove}
onChange={(event, newValue) => {
  setProve(newValue);
}}      
getOptionSelected={(option, value) => option.descripcion === value.descripcion}      
getOptionLabel={(option) => option.descripcion}
style={{ width:"95%" }}
renderInput={(params) => <TextField {...params}    className={classes.textField} margin="dense" label="Cliente Proveedor" variant="outlined" />}
/>
<Autocomplete
id="line"
options={linea}
name="line"
freeSolo      
value={line}
onChange={(event, newValue) => {
  setLine(newValue);
}}      
getOptionSelected={(option, value) => option.descripcion === value.descripcion}      
getOptionLabel={(option) => option.descripcion}
style={{ width:"95%" }}
renderInput={(params) => <TextField {...params}    className={classes.textField} margin="dense" label="Lineas /Marcas" variant="outlined" />}
/>
<Autocomplete
id="cate"
options={categoria}
name="cate"
freeSolo      
value={cate}
onChange={(event, newValue) => {
  setCate(newValue);
}}      
getOptionSelected={(option, value) => option.descripcion === value.descripcion}      
getOptionLabel={(option) => option.descripcion}
style={{ width:"95%" }}
renderInput={(params) => <TextField {...params}    className={classes.textField} margin="dense" label="Categorias" variant="outlined" />}
/>  








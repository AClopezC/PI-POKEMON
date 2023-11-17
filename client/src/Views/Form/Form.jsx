import React, { useEffect, useState } from 'react';
import style from './form.module.css';
import { NavBar } from '../../Components/NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTypes, createPokemon } from '../../Redux/actions';

export const Form = () => {

   const tipos = useSelector(state => state.tipos);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getAllTypes())
   }, [dispatch]);

   //* ESTADO PRINCIPAL=>
   const [state, setState] = useState({
      nombre: '',
      imagen: '',
      vida: '',
      ataque: '',
      defensa: '',
      velocidad: '',
      altura: '',
      peso: '',
      tipo: []
   });
   
   const handleChangeState = (event) => {
      if (event.target.name === 'tipo') {
         if (state.tipo.includes(event.target.value)) return
         setState({
            ...state,
            [event.target.name]: [...state[event.target.name], event.target.value]
         });
      }
      else {
         setState({
         ...state,
         [event.target.name]: event.target.value
      })
      }
      handleChangeError({
         ...state,
         [event.target.name]: event.target.value
      }, event.target.name)
   };

   //* ESTADO DE ERRORES=>

   const [error, setError] = useState({
      nombre: 'Este campo es requerido',
      imagen: 'Este campo es requerido',
      vida: 'Este campo es requerido',
      defensa: 'Este campo es requerido',
      ataque: 'Este campo es requerido',
      velocidad: 'Este campo es requerido',
      altura: 'Este campo es requerido',
      peso: 'Este campo es requerido',
      tipo: 'Debe seleccionar al menos un tipo'
   });

   const handleChangeError = (validate, name) => {
      switch (name) {
         case 'nombre':
            if (validate.nombre === '') {
               setError({...error, nombre: 'El nombre es requerido.'})
            }
            else setError({...error, nombre: ''})
            
            break;
         case 'imagen':
            if (validate.imagen === '') {
               setError({...error, imagen: 'La imagen es requerida.'})
            }
            else setError({...error, imagen: ''})
            break;
         case 'vida':
            if (validate.vida === '') {
               setError({...error, vida: 'La vida es requerido.'})
            }
            else setError({...error, vida: ''})
            break;
         case 'defensa':
            if (validate.defensa === '') {
               setError({...error, defensa: 'La defensa es requerido.'})
            }
            else setError({...error, defensa: ''})
            break;
         case 'ataque':
            if (validate.ataque === '') {
               setError({...error, ataque: 'El ataque es requerido.'})
            }
            else setError({...error, ataque: ''})
            break;
         case 'velocidad':
            if (validate.velocidad === '') {
               setError({...error, velocidad: 'La velocidad es requerido.'})
            }
            else setError({...error, velocidad: ''})
            break;
         case 'altura':
            if (validate.altura === '') {
               setError({...error, altura: 'La altura es requerido.'})
            }
            else setError({...error, altura: ''})
            break;
         case 'peso':
            if (validate.peso === '') {
               setError({...error, peso: 'El peso es requerido.'})
            }
            else setError({...error, peso: ''})
            break;
         case 'tipo':
            if (validate.tipo.length === 0) {
               setError({...error, tipo: 'Debes seleccionar al menos un tipo.'})
            }
            else setError({...error, tipo: ''})
            break;
         default:
            break;
      }
   };

   //* HABILITADOR DE BOTÓN=>
   const disable = () => {
      for (let err in error) {
         if (error[err] !== '') {
            return true; // Si se encuentra un error, deshabilita el botón.
         }
      }
      return false; // Solo se habilita si no se encontraron errores.
   };

   //* ELIMINAR TIPO SELECCIONADO=>
   const handleDelete = (event) => {
      setState({
         ...state,
         tipo: state.tipo.filter(tip => tip !== event.target.id)
      });
   };

   //*CREAR POKEMON=>

   const handleSubmit = async (event) => {
      event.preventDefault();
      try {
         await dispatch(createPokemon(state));
         if (state.tipo.length > 0) {
            alert('Pokemon creado con éxito')
         }
      } catch (error) {
         alert('Hubo un error al crear el pokemon')
      }
   };


  return (
     <div className={style.div}>
        <NavBar />
        <h1 className={style.h1}>Formulario</h1>
        <h2 className={style.h3}>Crea un nuevo pokemon</h2>
        <h3 className={style.h3}>Requisito: ¡Sé muy creativo!</h3>
        <div>
         <form className={style.form} action="" onSubmit={handleSubmit}>
            <label className={style.label} htmlFor="">Nombre: </label>
               <input className={style.input} name='nombre' onChange={handleChangeState} type="text" />
            <label className={style.error} htmlFor="nombre">{error.nombre}</label>
              
            <label className={style.label} htmlFor="">Imagen: </label>
               <input className={style.input} name='imagen' onChange={handleChangeState} type="text" />
            <label className={style.error} htmlFor="">{error.imagen}</label>
              
            <label className={style.label} htmlFor="">Vida: </label>
               <input className={style.input} name='vida' onChange={handleChangeState} type="text" />
            <label className={style.error} htmlFor="">{error.vida}</label>
              
            <label className={style.label} htmlFor="">Ataque: </label>
               <input className={style.input} name='ataque' onChange={handleChangeState} type="text" />
            <label className={style.error} htmlFor="">{error.ataque}</label>

              
            <label className={style.label} htmlFor="">Defensa: </label>
               <input className={style.input} name='defensa' onChange={handleChangeState} type="text" />
            <label className={style.error} htmlFor="">{error.defensa}</label>

              
            <label className={style.label} htmlFor="">Velocidad: </label>
               <input className={style.input} name='velocidad' onChange={handleChangeState} type="text" />
            <label className={style.error} htmlFor="">{error.velocidad}</label>

              
            <label className={style.label} htmlFor="">Altura: </label>
               <input className={style.input} name='altura' onChange={handleChangeState} type="text" />
            <label className={style.error} htmlFor="">{error.altura}</label>

              
            <label className={style.label} htmlFor="">Peso: </label>
               <input className={style.input} name='peso' onChange={handleChangeState} type="text" />
            <label className={style.error} htmlFor="">{error.peso}</label>
              
              
            <label className={style.label} htmlFor="" >Selecciona un tipo para tu pokemon: </label>
            <select name="tipo" onChange={handleChangeState}>
                 <option key='default' value="">Despliega para seleccionar</option>
                 {
                    tipos?.map((tip, index) => (
                       <option key={index} value={tip.name}>{tip.name}</option>
                    ))
                 }
            </select>
            <label htmlFor="tipo" className={style.error}>{error.tipo}</label>
            
              <div>
              <h3>Tipos seleccionados</h3>
              {
                  state.tipo.map((tipo, index) =>
                     <div key={index}>
                        <label>{tipo}</label>
                        <button id={tipo} onClick={handleDelete}>x</button>
                     </div>)
                 }
               </div>
              <input disabled={disable()} type="submit" />
         </form>
        </div>
    </div>
  )
}

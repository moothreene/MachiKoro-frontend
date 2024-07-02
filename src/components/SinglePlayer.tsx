import Tutorial from './Tutorial';
export const SPTutorialContext = createContext(0);
    <SPTutorialContext.Provider value={tutorial}>
      <Tutorial
        setOpen={handleTutorialOpen}
        setClose={handleTutorialClose}
        setNext={handleTutorialNext}
        setPrev={handleTutorialPrev}
      />
    </SPTutorialContext.Provider>

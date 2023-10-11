const Items = ({ item }) => {
  const { name, link, category } = item;

  return (
    
      <div>
        <div>
          <p>Name:{name}</p>
          <p>Category:{category}</p>
        
      </div>
    </div>
  );
};

export default Items;

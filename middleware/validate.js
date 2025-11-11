export const validateProduct = (req, res, next) => {
 const { name, price } = req.body;
 if (!name || typeof name !== "string" || name.trim().length < 2) {
 return res
 .status(400)
 .json({ message: "Invalid product name. Minimum 2 characters required."
});
 }
 if (price === undefined || typeof price !== "number" || price < 0) {
 return res.status(400).json({ message: "Invalid product price." });
 }
 next(); // proceed to controller
};

export default class ObjectUtils {
	static iterateOverNumber = (num, func) => {
		for ( let i of Array(num).keys() ) {
			func(i);
		}
	};
}
const { getAllCompany, getCompanyById, createCompany, updateCompany, deleteCompany } = require('./company.controller')
const { checkToken } = require('../../auth/check.token')
const router = require('express').Router()

router.get('/', checkToken, getAllCompany)
router.get('/:id', checkToken, getCompanyById)
router.post('/', checkToken, createCompany)
router.patch('/', checkToken, updateCompany)
router.delete('/', checkToken, deleteCompany)

module.exports = router
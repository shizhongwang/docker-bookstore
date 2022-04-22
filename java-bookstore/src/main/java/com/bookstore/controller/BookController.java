package com.bookstore.controller;

import com.bookstore.entity.Book;
import com.bookstore.repository.BookRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@CrossOrigin
//@Api(description = "To create a special Ably token(JWT) that is needed by a client using Ably SDK, to connect with the Ably")
//@Log4j2
@RequiredArgsConstructor
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    @GetMapping("/users")
    public List<Book> getAllBookss() {
        return bookRepository.findAll();
    }

    //    @GetMapping("/books")
    @ApiOperation("get a end user's JWT token")
    @RequestMapping(value = {"/books"}, method = RequestMethod.GET)
//    @ApiImplicitParams(value = {
//            @ApiImplicitParam(
//                    name = Constants.HEADER_USER_UUID,
//                    required = true,
//                    dataType = "string",
//                    paramType = "header",
//                    defaultValue = SampleConstValues.UUID,
//                    value = Constants.HEADER_USER_UUID)}
//    )
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable(value = "id") Long bookId)
            throws ResourceNotFoundException {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found for this id :: " + bookId));
        return ResponseEntity.ok().body(book);
    }

    @PostMapping("/books")
    public Book createBook(@RequestBody Book book) {
        System.out.println(book);
        return bookRepository.save(book);
    }

//	@PostMapping("/books")
//	public Book createBook(@Valid @RequestBody Book book) {
//		return bookRepository.save(book);
//	}

    @PutMapping("/books/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable(value = "id") Long bookId,
                                           @RequestBody Book bookDetails) throws ResourceNotFoundException {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found for this id :: " + bookId));

        book.setName(bookDetails.getName());
        book.setDescription(bookDetails.getDescription());
        book.setCategoryId(bookDetails.getCategoryId());

        final Book updatedBook = bookRepository.save(book);
        return ResponseEntity.ok(updatedBook);
    }

    @DeleteMapping("/books/{id}")
    public Map<String, Boolean> deleteBook(@PathVariable(value = "id") Long bookId)
            throws ResourceNotFoundException {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found for this id :: " + bookId));

        bookRepository.delete(book);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}

import Accordion from "react-bootstrap/Accordion";
import Stack from "react-bootstrap/Stack";

function QAAccordion() {
  return (
    <Accordion className="AccordionMainBody">
      <Accordion.Item eventKey="0" className="AccordionItem">
        <Accordion.Header className="AccordionHeader">
          Are we a registered NGO?
        </Accordion.Header>
        <Accordion.Body className="AccordionBody">
          <Stack className="mx-auto ContactCards justify-content-center">
            <p>
              Sunfield Home Fortuna (located near Balfour, Mpumalanga) has been
              operational since at least 2010 as a recognized community-based
              facility and care center,
            </p>
          </Stack>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className="AccordionItem">
        <Accordion.Header className="AccordionHeader">
          How can I donate?
        </Accordion.Header>
        <Accordion.Body className="AccordionBody">
          <Stack className="mx-auto ContactCards justify-content-center">
            <p>
              Donate by going to the “Donate” screen on the top of the screen
              and following the process showed!
            </p>
          </Stack>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" className="AccordionItem">
        <Accordion.Header className="AccordionHeader">
          How can I become a volunteer?
        </Accordion.Header>
        <Accordion.Body className="AccordionBody">
          <Stack className="mx-auto ContactCards justify-content-center">
            <p>
              Go the “Contact Us” page and talk to our General manager or a
              staff member at Sunfield Home Fortuna for more information.
            </p>
          </Stack>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default QAAccordion;
